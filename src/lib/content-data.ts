import connectDB from './mongodb';
import {Project} from './models/project';
import {Blog} from './models/blog';
import {ensureInitialContentSeeded} from './seed-content';

type LeanRecord = Record<string, unknown>;

export function mapProject(doc: LeanRecord) {
  return {
    id: Number(doc.legacyId ?? 0),
    _id: String(doc._id ?? ''),
    title: String(doc.title ?? ''),
    year: String(doc.year ?? ''),
    description: String(doc.description ?? ''),
    mainTasks: Array.isArray(doc.mainTasks) ? doc.mainTasks.map(String) : [],
    teamSize: String(doc.teamSize ?? ''),
    duration: String(doc.duration ?? ''),
    platform: String(doc.platform ?? ''),
    features: Array.isArray(doc.features) ? doc.features.map(String) : [],
    technologies: Array.isArray(doc.technologies) ? doc.technologies.map(String) : [],
    designPatterns: Array.isArray(doc.designPatterns) ? doc.designPatterns.map(String) : [],
    videoUrl: String(doc.videoUrl ?? ''),
    screenshotColumns: Number(doc.screenshotColumns ?? 2),
    screenshots: Array.isArray(doc.screenshots) ? doc.screenshots.map(String) : [],
    createdAt: doc.createdAt ? new Date(String(doc.createdAt)).toISOString() : '',
    updatedAt: doc.updatedAt ? new Date(String(doc.updatedAt)).toISOString() : '',
  };
}

export function mapBlog(doc: LeanRecord) {
  return {
    id: Number(doc.legacyId ?? 0),
    _id: String(doc._id ?? ''),
    title: String(doc.title ?? ''),
    slug: String(doc.slug ?? ''),
    excerpt: String(doc.excerpt ?? ''),
    author: String(doc.author ?? 'Doan Viet'),
    publishedAt: doc.publishedAt ? new Date(String(doc.publishedAt)).toISOString() : new Date().toISOString(),
    readTime: String(doc.readTime ?? '5 min read'),
    tags: Array.isArray(doc.tags) ? doc.tags.map(String) : [],
    views: Number(doc.views ?? 0),
    content: String(doc.content ?? ''),
    createdAt: doc.createdAt ? new Date(String(doc.createdAt)).toISOString() : '',
    updatedAt: doc.updatedAt ? new Date(String(doc.updatedAt)).toISOString() : '',
  };
}

export async function getPublicProjects() {
  await connectDB();
  await ensureInitialContentSeeded();
  const docs = await Project.find().sort({legacyId: 1}).lean();
  return docs.map((doc) => mapProject(doc as unknown as LeanRecord));
}

export async function getPublicProjectById(id: number) {
  await connectDB();
  await ensureInitialContentSeeded();
  const doc = await Project.findOne({legacyId: id}).lean();
  return doc ? mapProject(doc as unknown as LeanRecord) : null;
}

export async function getPublicBlogs() {
  await connectDB();
  await ensureInitialContentSeeded();
  const docs = await Blog.find().sort({publishedAt: -1, legacyId: -1}).lean();
  return docs.map((doc) => mapBlog(doc as unknown as LeanRecord));
}

export async function getPublicBlogBySlug(slug: string) {
  await connectDB();
  await ensureInitialContentSeeded();
  const doc = await Blog.findOne({slug}).lean();
  return doc ? mapBlog(doc as unknown as LeanRecord) : null;
}

export async function getRelatedBlogs(excludeLegacyId: number, limit = 2) {
  await connectDB();
  await ensureInitialContentSeeded();
  const docs = await Blog.find({legacyId: {$ne: excludeLegacyId}})
    .sort({publishedAt: -1, legacyId: -1})
    .limit(limit)
    .lean();

  return docs.map((doc) => mapBlog(doc as unknown as LeanRecord));
}
