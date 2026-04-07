import path from 'path';
import {readFile} from 'fs/promises';
import connectDB from './mongodb';
import {Project} from './models/project';
import {Blog} from './models/blog';
import {projects as legacyProjects} from '../data/projects.js';
import {blogPosts as legacyBlogPosts} from '../data/blogPosts.js';

let seedPromise: Promise<void> | null = null;
let hasCheckedSeed = false;

async function loadMarkdownFromContentPath(contentPath: string) {
  const normalizedPath = contentPath.replace(/^\//, '');
  const absolutePath = path.join(process.cwd(), 'public', normalizedPath);
  return readFile(absolutePath, 'utf-8');
}

export async function ensureInitialContentSeeded() {
  if (hasCheckedSeed) {
    return;
  }

  if (seedPromise) {
    return seedPromise;
  }

  seedPromise = (async () => {
    await connectDB();

    const [projectCount, blogCount] = await Promise.all([
      Project.countDocuments(),
      Blog.countDocuments(),
    ]);

    if (projectCount === 0) {
      await Project.insertMany(
        legacyProjects.map((project) => ({
          legacyId: project.id,
          title: project.title,
          year: project.year ?? '',
          description: project.description ?? '',
          mainTasks: Array.isArray(project.mainTasks) ? project.mainTasks : [],
          teamSize: project.teamSize ?? '',
          duration: project.duration ?? '',
          platform: project.platform ?? '',
          features: Array.isArray(project.features) ? project.features : [],
          technologies: Array.isArray(project.technologies) ? project.technologies : [],
          designPatterns: Array.isArray(project.designPatterns) ? project.designPatterns : [],
          videoUrl: project.videoUrl ?? '',
          screenshotColumns: project.screenshotColumns ?? 2,
          screenshots: Array.isArray(project.screenshots) ? project.screenshots : [],
        }))
      );
    }

    if (blogCount === 0) {
      const blogs = await Promise.all(
        legacyBlogPosts.map(async (blog) => ({
          legacyId: blog.id,
          title: blog.title,
          slug: blog.slug,
          excerpt: blog.excerpt ?? '',
          author: blog.author ?? 'Doan Viet',
          publishedAt: blog.publishedAt ? new Date(blog.publishedAt) : new Date(),
          readTime: blog.readTime ?? '5 min read',
          tags: Array.isArray(blog.tags) ? blog.tags : [],
          views: typeof blog.views === 'number' ? blog.views : 0,
          content: blog.contentPath ? await loadMarkdownFromContentPath(blog.contentPath) : '',
        }))
      );

      await Blog.insertMany(blogs);
    }

    hasCheckedSeed = true;
  })();

  try {
    await seedPromise;
  } finally {
    seedPromise = null;
  }
}
