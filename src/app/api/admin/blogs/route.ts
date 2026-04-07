import {NextResponse} from 'next/server';
import connectDB from '../../../../lib/mongodb';
import {Blog} from '../../../../lib/models/blog';
import {ensureInitialContentSeeded} from '../../../../lib/seed-content';
import {mapBlog} from '../../../../lib/content-data';
import {
  normalizeNumber,
  normalizeStringArray,
  toSlug,
} from '../../../../lib/admin-utils';

async function ensureUniqueSlug(baseSlug: string) {
  let slug = baseSlug || `blog-${Date.now()}`;
  let suffix = 1;

  while (await Blog.exists({slug})) {
    slug = `${baseSlug || 'blog'}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export async function GET() {
  await connectDB();
  await ensureInitialContentSeeded();

  const blogs = await Blog.find().sort({publishedAt: -1, legacyId: -1}).lean();
  return NextResponse.json({
    success: true,
    data: blogs.map((item) => mapBlog(item as unknown as Record<string, unknown>)),
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
    const latest = await Blog.findOne().sort({legacyId: -1}).lean();
    legacyId = Number(latest?.legacyId ?? 0) + 1;
  }

  const existingByLegacyId = await Blog.findOne({legacyId}).lean();
  if (existingByLegacyId) {
    return NextResponse.json(
      {success: false, message: 'Blog id already exists.'},
      {status: 409}
    );
  }

  const rawSlug =
    typeof payload?.slug === 'string' && payload.slug.trim().length > 0
      ? payload.slug
      : title;

  const slug = await ensureUniqueSlug(toSlug(rawSlug));

  const created = await Blog.create({
    legacyId,
    title,
    slug,
    excerpt: String(payload?.excerpt ?? ''),
    author: String(payload?.author ?? 'Doan Viet'),
    publishedAt: payload?.publishedAt ? new Date(String(payload.publishedAt)) : new Date(),
    readTime: String(payload?.readTime ?? '5 min read'),
    tags: normalizeStringArray(payload?.tags),
    views: Math.max(0, normalizeNumber(payload?.views, 0)),
    content: String(payload?.content ?? ''),
  });

  return NextResponse.json({
    success: true,
    message: 'Blog created.',
    data: mapBlog(created.toObject() as unknown as Record<string, unknown>),
  });
}
