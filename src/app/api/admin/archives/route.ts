import {NextResponse} from 'next/server';
import {revalidatePath, revalidateTag} from 'next/cache';
import connectDB from '../../../../lib/mongodb';
import {Archive} from '../../../../lib/models/archive';
import {ARCHIVES_CACHE_TAG, mapArchive} from '../../../../lib/content-data';
import {toSlug} from '../../../../lib/admin-utils';

const SUPPORTED_LOCALES = ['vi', 'en'] as const;

function revalidateArchiveListPaths() {
  for (const locale of SUPPORTED_LOCALES) {
    revalidatePath(`/${locale}/archives`);
  }
}

function revalidateArchiveDetailPaths(slug: string) {
  if (!slug) {
    return;
  }

  for (const locale of SUPPORTED_LOCALES) {
    revalidatePath(`/${locale}/archives/${slug}`);
  }
}

async function ensureUniqueSlug(baseSlug: string) {
  let slug = baseSlug || `archive-${Date.now()}`;
  let suffix = 1;

  while (await Archive.exists({slug})) {
    slug = `${baseSlug || 'archive'}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export async function GET() {
  await connectDB();

  const archives = await Archive.find().sort({happenedAt: -1, createdAt: -1}).lean();
  return NextResponse.json({
    success: true,
    data: archives.map((item) => mapArchive(item as unknown as Record<string, unknown>)),
  });
}

export async function POST(request: Request) {
  await connectDB();

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

  const slug = await ensureUniqueSlug(toSlug(rawSlug));

  const created = await Archive.create({
    title,
    slug,
    content: String(payload?.content ?? ''),
    happenedAt: payload?.happenedAt ? new Date(String(payload.happenedAt)) : new Date(),
  });

  revalidateTag(ARCHIVES_CACHE_TAG);
  revalidateArchiveListPaths();
  revalidateArchiveDetailPaths(created.slug);

  return NextResponse.json({
    success: true,
    message: 'Archive entry created.',
    data: mapArchive(created.toObject() as unknown as Record<string, unknown>),
  });
}
