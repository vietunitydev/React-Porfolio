import Link from 'next/link';
import AdminContainer from '../../components/admin/AdminContainer';

const cardClass =
  'rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md';

export default function AdminDashboardPage() {
  return (
    <AdminContainer title="Dashboard">
      <div className="grid gap-4 md:grid-cols-4">
        <Link href="/admin/projects" className={cardClass}>
          <h2 className="text-lg font-semibold text-slate-900">Projects</h2>
          <p className="mt-2 text-sm text-slate-600">
            Create, edit, and delete project entries shown on the portfolio.
          </p>
        </Link>

        <Link href="/admin/blogs" className={cardClass}>
          <h2 className="text-lg font-semibold text-slate-900">Blogs</h2>
          <p className="mt-2 text-sm text-slate-600">
            Manage blog metadata and markdown content from one place.
          </p>
        </Link>

        <Link href="/admin/archives" className={cardClass}>
          <h2 className="text-lg font-semibold text-slate-900">Archives</h2>
          <p className="mt-2 text-sm text-slate-600">
            Create personal milestone stories used on the public archive pages.
          </p>
        </Link>

        <Link href="/admin/media" className={cardClass}>
          <h2 className="text-lg font-semibold text-slate-900">Media</h2>
          <p className="mt-2 text-sm text-slate-600">
            Upload images to Cloudinary and copy URLs for projects/blogs.
          </p>
        </Link>
      </div>
    </AdminContainer>
  );
}
