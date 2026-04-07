import mongoose from 'mongoose';
import {NextResponse} from 'next/server';
import {revalidateTag} from 'next/cache';
import connectDB from '../../../../../lib/mongodb';
import {Blog} from '../../../../../lib/models/blog';
import {BLOGS_CACHE_TAG, mapBlog} from '../../../../../lib/content-data';
import {
  normalizeNumber,
  normalizeStringArray,
  toSlug,
} from '../../../../../lib/admin-utils';

type RouteContext = {
  params: Promise<{id: string}>;
};

async function resolveId(context: RouteContext) {
  const params = await context.params;
  return params.id;
}

async function ensureUniqueSlug(baseSlug: string, currentId: string) {
  let slug = baseSlug || `blog-${Date.now()}`;
  let suffix = 1;

  while (await Blog.exists({slug, _id: {$ne: currentId}})) {
    slug = `${baseSlug || 'blog'}-${suffix}`;
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

  const blog = await Blog.findById(id).lean();

  if (!blog) {
    return NextResponse.json({success: false, message: 'Blog not found.'}, {status: 404});
  }

  return NextResponse.json({
    success: true,
    data: mapBlog(blog as unknown as Record<string, unknown>),
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

  const updated = await Blog.findByIdAndUpdate(
    id,
    {
      legacyId: Math.max(1, normalizeNumber(payload?.legacyId, 1)),
      title,
      slug,
      excerpt: String(payload?.excerpt ?? ''),
      author: String(payload?.author ?? 'Doan Viet'),
      publishedAt: payload?.publishedAt ? new Date(String(payload.publishedAt)) : new Date(),
      readTime: String(payload?.readTime ?? '5 min read'),
      tags: normalizeStringArray(payload?.tags),
      views: Math.max(0, normalizeNumber(payload?.views, 0)),
      content: String(payload?.content ?? ''),
    },
    {new: true, runValidators: true}
  ).lean();

  if (!updated) {
    return NextResponse.json({success: false, message: 'Blog not found.'}, {status: 404});
  }

  revalidateTag(BLOGS_CACHE_TAG);

  return NextResponse.json({
    success: true,
    message: 'Blog updated.',
    data: mapBlog(updated as unknown as Record<string, unknown>),
  });
}

export async function DELETE(_request: Request, context: RouteContext) {
  await connectDB();
  const id = await resolveId(context);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({success: false, message: 'Invalid id.'}, {status: 400});
  }

  const deleted = await Blog.findByIdAndDelete(id).lean();

  if (!deleted) {
    return NextResponse.json({success: false, message: 'Blog not found.'}, {status: 404});
  }

  revalidateTag(BLOGS_CACHE_TAG);

  return NextResponse.json({success: true, message: 'Blog deleted.'});
}
