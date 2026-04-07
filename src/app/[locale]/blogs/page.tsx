import BlogPage from '../../../views/BlogPage.jsx';
import {getPublicBlogs} from '../../../lib/content-data';

export default async function Blogs() {
  const blogs = await getPublicBlogs();
  return <BlogPage blogPosts={blogs} />;
}
