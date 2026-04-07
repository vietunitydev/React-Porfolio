'use client';

import {FormEvent, useEffect, useMemo, useState} from 'react';
import AdminContainer from '../../../components/admin/AdminContainer';

type BlogRecord = {
  _id: string;
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  views: number;
  content: string;
};

type BlogFormState = {
  legacyId: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string;
  views: string;
  content: string;
};

const initialForm: BlogFormState = {
  legacyId: '',
  title: '',
  slug: '',
  excerpt: '',
  author: 'Doan Viet',
  publishedAt: '',
  readTime: '5 min read',
  tags: '',
  views: '0',
  content: '',
};

function toLines(text: string) {
  return text
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function toDatetimeInputValue(isoDate: string) {
  if (!isoDate) {
    return '';
  }

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 16);
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogFormState>(initialForm);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  const loadBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/blogs', {cache: 'no-store'});
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Cannot load blogs');
      }
      setBlogs(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cannot load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadBlogs();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  const startEdit = (blog: BlogRecord) => {
    setEditingId(blog._id);
    setForm({
      legacyId: String(blog.id),
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      author: blog.author,
      publishedAt: toDatetimeInputValue(blog.publishedAt),
      readTime: blog.readTime,
      tags: blog.tags.join('\n'),
      views: String(blog.views),
      content: blog.content,
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload = {
        legacyId: Number(form.legacyId || 0),
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        author: form.author,
        publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : undefined,
        readTime: form.readTime,
        tags: toLines(form.tags),
        views: Number(form.views || 0),
        content: form.content,
      };

      const endpoint = isEditing ? `/api/admin/blogs/${editingId}` : '/api/admin/blogs';

      const response = await fetch(endpoint, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Save failed');
      }

      await loadBlogs();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!window.confirm('Delete this blog?')) {
      return;
    }

    setError('');
    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Delete failed');
      }

      await loadBlogs();
      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <AdminContainer title="Blogs">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            {isEditing ? 'Edit blog' : 'New blog'}
          </h2>

          <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
            <label className="text-sm text-slate-700">
              Legacy ID
              <input
                value={form.legacyId}
                onChange={(event) => setForm((prev) => ({...prev, legacyId: event.target.value}))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                placeholder="Auto if empty"
              />
            </label>
            <label className="text-sm text-slate-700">
              Views
              <input
                type="number"
                min={0}
                value={form.views}
                onChange={(event) => setForm((prev) => ({...prev, views: event.target.value}))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>

            <label className="text-sm text-slate-700 md:col-span-2">
              Title
              <input
                required
                value={form.title}
                onChange={(event) => setForm((prev) => ({...prev, title: event.target.value}))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>

            <label className="text-sm text-slate-700 md:col-span-2">
              Slug (optional)
              <input
                value={form.slug}
                onChange={(event) => setForm((prev) => ({...prev, slug: event.target.value}))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                placeholder="Auto from title if empty"
              />
            </label>

            <label className="text-sm text-slate-700 md:col-span-2">
              Excerpt
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(event) => setForm((prev) => ({...prev, excerpt: event.target.value}))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>

            <label className="text-sm text-slate-700">
              Author
              <input
                value={form.author}
                onChange={(event) => setForm((prev) => ({...prev, author: event.target.value}))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>

            <label className="text-sm text-slate-700">
              Published at
              <input
                type="datetime-local"
                value={form.publishedAt}
                onChange={(event) =>
                  setForm((prev) => ({...prev, publishedAt: event.target.value}))
                }
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>

            <label className="text-sm text-slate-700">
              Read time
              <input
                value={form.readTime}
                onChange={(event) => setForm((prev) => ({...prev, readTime: event.target.value}))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>

            <label className="text-sm text-slate-700">
              Tags (line break or comma)
              <textarea
                rows={3}
                value={form.tags}
                onChange={(event) => setForm((prev) => ({...prev, tags: event.target.value}))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>

            <label className="text-sm text-slate-700 md:col-span-2">
              Markdown content
              <textarea
                rows={14}
                required
                value={form.content}
                onChange={(event) => setForm((prev) => ({...prev, content: event.target.value}))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-mono"
              />
            </label>

            <div className="md:col-span-2 flex flex-wrap items-center gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Saving...' : isEditing ? 'Update blog' : 'Create blog'}
              </button>
              {isEditing ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  Cancel edit
                </button>
              ) : null}
            </div>
          </form>

          {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Blog list</h2>

          {loading ? <p className="text-sm text-slate-500">Loading...</p> : null}

          <div className="space-y-2">
            {blogs.map((blog) => (
              <div key={blog._id} className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{blog.title}</h3>
                    <p className="text-xs text-slate-500">/{blog.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(blog)}
                      className="rounded-md bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void onDelete(blog._id)}
                      className="rounded-md bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {!loading && blogs.length === 0 ? (
              <p className="text-sm text-slate-500">No blogs yet.</p>
            ) : null}
          </div>
        </section>
      </div>
    </AdminContainer>
  );
}
