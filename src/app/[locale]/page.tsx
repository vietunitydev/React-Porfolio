import HomePage from '../../views/HomePage.jsx';
import {getPublicBlogs, getPublicProjects} from '../../lib/content-data';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [projects, blogs] = await Promise.all([getPublicProjects(), getPublicBlogs()]);

  return <HomePage projects={projects} blogs={blogs} />;
}
