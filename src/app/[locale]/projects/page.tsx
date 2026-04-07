import ProjectsPage from '../../../views/ProjectsPage.jsx';
import {getPublicProjects} from '../../../lib/content-data';

export default async function Projects() {
  const projects = await getPublicProjects();
  return <ProjectsPage projects={projects} />;
}
