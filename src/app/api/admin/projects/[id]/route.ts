import mongoose from 'mongoose';
import {NextResponse} from 'next/server';
import {revalidateTag} from 'next/cache';
import connectDB from '../../../../../lib/mongodb';
import {Project} from '../../../../../lib/models/project';
import {mapProject, PROJECTS_CACHE_TAG} from '../../../../../lib/content-data';
import {normalizeNumber, normalizeStringArray} from '../../../../../lib/admin-utils';

type RouteContext = {
  params: Promise<{id: string}>;
};

async function resolveId(context: RouteContext) {
  const params = await context.params;
  return params.id;
}

export async function GET(_request: Request, context: RouteContext) {
  await connectDB();
  const id = await resolveId(context);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({success: false, message: 'Invalid id.'}, {status: 400});
  }

  const project = await Project.findById(id).lean();
  if (!project) {
    return NextResponse.json({success: false, message: 'Project not found.'}, {status: 404});
  }

  return NextResponse.json({
    success: true,
    data: mapProject(project as unknown as Record<string, unknown>),
  });
}

export async function PUT(request: Request, context: RouteContext) {
  await connectDB();
  const id = await resolveId(context);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({success: false, message: 'Invalid id.'}, {status: 400});
  }

  const payload = await request.json();
  const title = typeof payload?.title === 'string' ? payload.title.trim() : '';

  if (!title) {
    return NextResponse.json(
      {success: false, message: 'Title is required.'},
      {status: 400}
    );
  }

  const updated = await Project.findByIdAndUpdate(
    id,
    {
      legacyId: normalizeNumber(payload?.legacyId, 0),
      title,
      year: String(payload?.year ?? ''),
      description: String(payload?.description ?? ''),
      mainTasks: normalizeStringArray(payload?.mainTasks),
      teamSize: String(payload?.teamSize ?? ''),
      duration: String(payload?.duration ?? ''),
      platform: String(payload?.platform ?? ''),
      features: normalizeStringArray(payload?.features),
      technologies: normalizeStringArray(payload?.technologies),
      designPatterns: normalizeStringArray(payload?.designPatterns),
      videoUrl: String(payload?.videoUrl ?? ''),
      screenshotColumns: Math.min(
        3,
        Math.max(1, normalizeNumber(payload?.screenshotColumns, 2))
      ),
      screenshots: normalizeStringArray(payload?.screenshots),
    },
    {new: true, runValidators: true}
  ).lean();

  if (!updated) {
    return NextResponse.json({success: false, message: 'Project not found.'}, {status: 404});
  }

  revalidateTag(PROJECTS_CACHE_TAG);

  return NextResponse.json({
    success: true,
    message: 'Project updated.',
    data: mapProject(updated as unknown as Record<string, unknown>),
  });
}

export async function DELETE(_request: Request, context: RouteContext) {
  await connectDB();
  const id = await resolveId(context);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({success: false, message: 'Invalid id.'}, {status: 400});
  }

  const deleted = await Project.findByIdAndDelete(id).lean();

  if (!deleted) {
    return NextResponse.json({success: false, message: 'Project not found.'}, {status: 404});
  }

  revalidateTag(PROJECTS_CACHE_TAG);

  return NextResponse.json({success: true, message: 'Project deleted.'});
}
