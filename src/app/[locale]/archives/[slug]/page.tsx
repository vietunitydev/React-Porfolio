import {notFound} from 'next/navigation';
import {getPublicArchiveBySlug} from '../../../../lib/content-data';
import {parseMarkdown} from '../../../../hook/parseMarkdown.js';
import ArchiveDetail from '../../../../components/archives/ArchiveDetail.jsx';

type ArchiveDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArchiveDetailPage({params}: ArchiveDetailPageProps) {
  const {slug} = await params;
  const archive = await getPublicArchiveBySlug(slug);

  if (!archive) {
    notFound();
  }

  const content = archive.content ?? '';

  return (
    <ArchiveDetail
      entry={archive}
      initialContent={parseMarkdown(content)}
    />
  );
}
