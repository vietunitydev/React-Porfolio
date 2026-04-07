import {NextResponse} from 'next/server';
import connectDB from '../../../../lib/mongodb';
import {Project} from '../../../../lib/models/project';
import {ensureInitialContentSeeded} from '../../../../lib/seed-content';
import {mapProject} from '../../../../lib/content-data';
import {normalizeNumber, normalizeStringArray} from '../../../../lib/admin-utils';

export async function GET() {
  await connectDB();
  await ensureInitialContentSeeded();

  const projects = await Project.find().sort({legacyId: 1}).lean();
  return NextResponse.json({
    success: true,
    data: projects.map((item) => mapProject(item as unknown as Record<string, unknown>)),
  });
}

export async function POST(request: Request) {
  await connectDB();
  await ensureInitialContentSeeded();

  const payload = await request.json();
  const title = typeof payload?.title === 'string' ? payload.title.trim() : '';

  if (!title) {
    return NextResponse.json(
      {success: false, message: 'Title is required.'},
      {status: 400}
    );
  }

  const requestedLegacyId = normalizeNumber(payload?.legacyId, 0);
  let legacyId = requestedLegacyId;

  if (legacyId <= 0) {
    const latest = await Project.findOne().sort({legacyId: -1}).lean();
    legacyId = Number(latest?.legacyId ?? 0) + 1;
  }

  const existingByLegacyId = await Project.findOne({legacyId}).lean();
  if (existingByLegacyId) {
    return NextResponse.json(
      {success: false, message: 'Project id already exists.'},
      {status: 409}
    );
  }

  const created = await Project.create({
    legacyId,
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
  });

  return NextResponse.json({
    success: true,
    message: 'Project created.',
    data: mapProject(created.toObject() as unknown as Record<string, unknown>),
  });
}
