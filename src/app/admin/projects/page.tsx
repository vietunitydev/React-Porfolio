'use client';

import {FormEvent, useEffect, useMemo, useState} from 'react';
import AdminContainer from '../../../components/admin/AdminContainer';
import {toProjectDateInputValue} from '../../../lib/project-date';

type ProjectRecord = {
  _id: string;
  id: number;
  title: string;
  year: string;
  description: string;
  mainTasks: string[];
  teamSize: string;
  duration: string;
  platform: string;
  features: string[];
  technologies: string[];
  designPatterns: string[];
  videoUrl: string;
  screenshotColumns: number;
  screenshots: string[];
};

type ProjectFormState = {
  legacyId: string;
  title: string;
  year: string;
  description: string;
  mainTasks: string;
  teamSize: string;
  duration: string;
  platform: string;
  features: string;
  technologies: string;
  designPatterns: string;
  videoUrl: string;
  screenshotColumns: string;
  screenshots: string;
};

const initialForm: ProjectFormState = {
  legacyId: '',
  title: '',
  year: '',
  description: '',
  mainTasks: '',
  teamSize: '',
  duration: '',
  platform: '',
  features: '',
  technologies: '',
  designPatterns: '',
  videoUrl: '',
  screenshotColumns: '2',
  screenshots: '',
};

function toLines(text: string) {
  return text
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectFormState>(initialForm);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  const loadProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/projects', {cache: 'no-store'});
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Cannot load projects');
      }
      setProjects(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cannot load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProjects();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  const startEdit = (project: ProjectRecord) => {
    setEditingId(project._id);
    setForm({
      legacyId: String(project.id),
      title: project.title,
      year: toProjectDateInputValue(project.year),
      description: project.description,
      mainTasks: project.mainTasks.join('\n'),
      teamSize: project.teamSize,
      duration: project.duration,
      platform: project.platform,
      features: project.features.join('\n'),
      technologies: project.technologies.join('\n'),
      designPatterns: project.designPatterns.join('\n'),
      videoUrl: project.videoUrl,
      screenshotColumns: String(project.screenshotColumns || 2),
      screenshots: project.screenshots.join('\n'),
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
        year: String(form.year || '').trim(),
        description: form.description,
        mainTasks: toLines(form.mainTasks),
        teamSize: form.teamSize,
        duration: form.duration,
        platform: form.platform,
        features: toLines(form.features),
        technologies: toLines(form.technologies),
        designPatterns: toLines(form.designPatterns),
        videoUrl: form.videoUrl,
        screenshotColumns: Number(form.screenshotColumns || 2),
        screenshots: toLines(form.screenshots),
      };

      const endpoint = isEditing
        ? `/api/admin/projects/${editingId}`
        : '/api/admin/projects';

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

      await loadProjects();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!window.confirm('Delete this project?')) {
      return;
    }

    setError('');
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Delete failed');
      }
      await loadProjects();
      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <AdminContainer title="Projects">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            {isEditing ? 'Edit project' : 'New project'}
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
              Date
              <input
                type="date"
                value={form.year}
                onChange={(event) => setForm((prev) => ({...prev, year: event.target.value}))}
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
              Description
              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm((prev) => ({...prev, description: event.target.value}))
                }
                rows={3}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="text-sm text-slate-700">
              Team size
              <input
                value={form.teamSize}
                onChange={(event) =>
                  setForm((prev) => ({...prev, teamSize: event.target.value}))
                }
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="text-sm text-slate-700">
              Duration
              <input
                value={form.duration}
                onChange={(event) =>
                  setForm((prev) => ({...prev, duration: event.target.value}))
                }
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="text-sm text-slate-700">
              Platform
              <input
                value={form.platform}
                onChange={(event) =>
                  setForm((prev) => ({...prev, platform: event.target.value}))
                }
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="text-sm text-slate-700">
              Screenshot columns (1-3)
              <input
                type="number"
                min={1}
                max={3}
                value={form.screenshotColumns}
                onChange={(event) =>
                  setForm((prev) => ({...prev, screenshotColumns: event.target.value}))
                }
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Main tasks (line break or comma)
              <textarea
                rows={3}
                value={form.mainTasks}
                onChange={(event) =>
                  setForm((prev) => ({...prev, mainTasks: event.target.value}))
                }
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Features (line break or comma)
              <textarea
                rows={3}
                value={form.features}
                onChange={(event) => setForm((prev) => ({...prev, features: event.target.value}))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Technologies (line break or comma)
              <textarea
                rows={3}
                value={form.technologies}
                onChange={(event) =>
                  setForm((prev) => ({...prev, technologies: event.target.value}))
                }
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Design patterns (line break or comma)
              <textarea
                rows={3}
                value={form.designPatterns}
                onChange={(event) =>
                  setForm((prev) => ({...prev, designPatterns: event.target.value}))
                }
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Video URL
              <input
                value={form.videoUrl}
                onChange={(event) => setForm((prev) => ({...prev, videoUrl: event.target.value}))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="text-sm text-slate-700 md:col-span-2">
              Screenshots URLs (line break or comma)
              <textarea
                rows={4}
                value={form.screenshots}
                onChange={(event) =>
                  setForm((prev) => ({...prev, screenshots: event.target.value}))
                }
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>

            <div className="md:col-span-2 flex flex-wrap items-center gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Saving...' : isEditing ? 'Update project' : 'Create project'}
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
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Project list</h2>

          {loading ? <p className="text-sm text-slate-500">Loading...</p> : null}

          <div className="space-y-2">
            {projects.map((project) => (
              <div
                key={project._id}
                className="rounded-lg border border-slate-200 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{project.title}</h3>
                    <p className="text-xs text-slate-500">
                      ID {project.id} • {project.year || 'No year'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(project)}
                      className="rounded-md bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void onDelete(project._id)}
                      className="rounded-md bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {!loading && projects.length === 0 ? (
              <p className="text-sm text-slate-500">No projects yet.</p>
            ) : null}
          </div>
        </section>
      </div>
    </AdminContainer>
  );
}
