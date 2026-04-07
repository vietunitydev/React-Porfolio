import {notFound} from 'next/navigation';
import BlogDetail from '../../../../components/blogs/BlogDetail.jsx';
import {getPublicBlogBySlug, getRelatedBlogs} from '../../../../lib/content-data';
import {extractHeadings, parseMarkdown} from '../../../../hook/parseMarkdown.js';

export const dynamic = 'force-dynamic';

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogDetailPage({params}: BlogDetailPageProps) {
  const {slug} = await params;
  const post = await getPublicBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const markdown = post.content ?? '';
  const relatedPosts = await getRelatedBlogs(post.id, 2);

  return (
    <BlogDetail
      post={post}
      relatedPosts={relatedPosts}
      initialContent={parseMarkdown(markdown)}
      initialHeadings={extractHeadings(markdown) as Array<{
        level: number;
        text: string;
        id: string;
      }>}
    />
  );
}
