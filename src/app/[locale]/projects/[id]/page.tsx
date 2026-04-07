import {notFound} from 'next/navigation';
import ProjectDetail from '../../../../components/projects/ProjectDetail.jsx';
import {getPublicProjectById} from '../../../../lib/content-data';

type ProjectDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetailPage({params}: ProjectDetailPageProps) {
  const {id} = await params;
  const parsedId = Number.parseInt(id, 10);

  if (Number.isNaN(parsedId)) {
    notFound();
  }

  const project = await getPublicProjectById(parsedId);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
