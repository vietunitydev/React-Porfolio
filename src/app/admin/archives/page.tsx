'use client';

import {FormEvent, useEffect, useMemo, useState} from 'react';
import AdminContainer from '../../../components/admin/AdminContainer';

type ArchiveRecord = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  happenedAt: string;
};

type ArchiveFormState = {
  title: string;
  slug: string;
  happenedAt: string;
  content: string;
};

const initialForm: ArchiveFormState = {
  title: '',
  slug: '',
  happenedAt: '',
  content: '',
};

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

export default function AdminArchivesPage() {
  const [archives, setArchives] = useState<ArchiveRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ArchiveFormState>(initialForm);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  const loadArchives = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/archives', {cache: 'no-store'});
      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Cannot load archives');
      }

      setArchives(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cannot load archives');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadArchives();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  const startEdit = (archive: ArchiveRecord) => {
    setEditingId(archive._id);
    setForm({
      title: archive.title,
      slug: archive.slug,
      happenedAt: toDatetimeInputValue(archive.happenedAt),
      content: archive.content,
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        happenedAt: form.happenedAt ? new Date(form.happenedAt).toISOString() : undefined,
        content: form.content,
      };

      const endpoint = isEditing
        ? `/api/admin/archives/${editingId}`
        : '/api/admin/archives';

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

      await loadArchives();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!window.confirm('Delete this archive entry?')) {
      return;
    }

    setError('');

    try {
      const response = await fetch(`/api/admin/archives/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Delete failed');
      }

      await loadArchives();
      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <AdminContainer title="Archives">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            {isEditing ? 'Edit archive entry' : 'New archive entry'}
          </h2>

          <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
            <label className="text-sm text-slate-700 md:col-span-2">
              Title
              <input
                required
                value={form.title}
                onChange={(event) => setForm((prev) => ({...prev, title: event.target.value}))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                placeholder="A milestone title"
              />
            </label>

            <label className="text-sm text-slate-700">
              Slug (optional)
              <input
                value={form.slug}
                onChange={(event) => setForm((prev) => ({...prev, slug: event.target.value}))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                placeholder="Auto from title if empty"
              />
            </label>

            <label className="text-sm text-slate-700">
              Happened at
              <input
                type="datetime-local"
                value={form.happenedAt}
                onChange={(event) =>
                  setForm((prev) => ({...prev, happenedAt: event.target.value}))
                }
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>

            <label className="text-sm text-slate-700 md:col-span-2">
              Content
              <textarea
                rows={14}
                required
                value={form.content}
                onChange={(event) => setForm((prev) => ({...prev, content: event.target.value}))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-mono"
                placeholder="Write your story in markdown..."
              />
            </label>

            <div className="md:col-span-2 flex flex-wrap items-center gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? 'Saving...'
                  : isEditing
                    ? 'Update archive entry'
                    : 'Create archive entry'}
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
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Archive list</h2>

          {loading ? <p className="text-sm text-slate-500">Loading...</p> : null}

          <div className="space-y-2">
            {archives.map((archive) => (
              <div key={archive._id} className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{archive.title}</h3>
                    <p className="text-xs text-slate-500">/{archive.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(archive)}
                      className="rounded-md bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void onDelete(archive._id)}
                      className="rounded-md bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {!loading && archives.length === 0 ? (
              <p className="text-sm text-slate-500">No archive entries yet.</p>
            ) : null}
          </div>
        </section>
      </div>
    </AdminContainer>
  );
}
