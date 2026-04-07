import ArchivesPage from '../../../views/ArchivesPage.jsx';
import {getPublicArchives} from '../../../lib/content-data';

export default async function Archives() {
  const archives = await getPublicArchives();
  return <ArchivesPage archives={archives} />;
}
