import BlogPage from '../../../views/BlogPage.jsx';
import {getPublicBlogs} from '../../../lib/content-data';

export const dynamic = 'force-dynamic';

export default async function Blogs() {
  const blogs = await getPublicBlogs();
  return <BlogPage blogPosts={blogs} />;
}
