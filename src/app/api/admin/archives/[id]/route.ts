import mongoose from 'mongoose';
import {NextResponse} from 'next/server';
import {revalidateTag} from 'next/cache';
import connectDB from '../../../../../lib/mongodb';
import {Archive} from '../../../../../lib/models/archive';
import {ARCHIVES_CACHE_TAG, mapArchive} from '../../../../../lib/content-data';
import {toSlug} from '../../../../../lib/admin-utils';

type RouteContext = {
  params: Promise<{id: string}>;
};

async function resolveId(context: RouteContext) {
  const params = await context.params;
  return params.id;
}

async function ensureUniqueSlug(baseSlug: string, currentId: string) {
  let slug = baseSlug || `archive-${Date.now()}`;
  let suffix = 1;

  while (await Archive.exists({slug, _id: {$ne: currentId}})) {
    slug = `${baseSlug || 'archive'}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export async function GET(_request: Request, context: RouteContext) {
  await connectDB();
  const id = await resolveId(context);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({success: false, message: 'Invalid id.'}, {status: 400});
  }

  const archive = await Archive.findById(id).lean();

  if (!archive) {
    return NextResponse.json({success: false, message: 'Archive entry not found.'}, {status: 404});
  }

  return NextResponse.json({
    success: true,
    data: mapArchive(archive as unknown as Record<string, unknown>),
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

  const rawSlug =
    typeof payload?.slug === 'string' && payload.slug.trim().length > 0
      ? payload.slug
      : title;

  const slug = await ensureUniqueSlug(toSlug(rawSlug), id);

  const updated = await Archive.findByIdAndUpdate(
    id,
    {
      title,
      slug,
      content: String(payload?.content ?? ''),
      happenedAt: payload?.happenedAt ? new Date(String(payload.happenedAt)) : new Date(),
    },
    {new: true, runValidators: true}
  ).lean();

  if (!updated) {
    return NextResponse.json({success: false, message: 'Archive entry not found.'}, {status: 404});
  }

  revalidateTag(ARCHIVES_CACHE_TAG);

  return NextResponse.json({
    success: true,
    message: 'Archive entry updated.',
    data: mapArchive(updated as unknown as Record<string, unknown>),
  });
}

export async function DELETE(_request: Request, context: RouteContext) {
  await connectDB();
  const id = await resolveId(context);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({success: false, message: 'Invalid id.'}, {status: 400});
  }

  const deleted = await Archive.findByIdAndDelete(id).lean();

  if (!deleted) {
    return NextResponse.json({success: false, message: 'Archive entry not found.'}, {status: 404});
  }

  revalidateTag(ARCHIVES_CACHE_TAG);

  return NextResponse.json({success: true, message: 'Archive entry deleted.'});
}
