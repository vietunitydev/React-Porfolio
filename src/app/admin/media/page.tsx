'use client';

import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import AdminContainer from '../../../components/admin/AdminContainer';

type AssetRecord = {
  _id: string;
  url: string;
  publicId: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  createdAt: string | null;
};

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<AssetRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [folder, setFolder] = useState('portfolio');
  const [uploading, setUploading] = useState(false);

  const loadAssets = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/media', {cache: 'no-store'});
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Cannot load media');
      }
      setAssets(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cannot load media');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadAssets();
  }, []);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const onUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please choose a file before upload.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('folder', folder);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Upload failed');
      }

      setSelectedFile(null);
      await loadAssets();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!window.confirm('Delete this asset?')) {
      return;
    }

    setError('');
    try {
      const response = await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Delete failed');
      }

      await loadAssets();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      setError('Cannot copy URL to clipboard.');
    }
  };

  return (
    <AdminContainer title="Media">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Upload image</h2>

          <form onSubmit={onUpload} className="space-y-3">
            <label className="block text-sm text-slate-700">
              Folder
              <input
                value={folder}
                onChange={(event) => setFolder(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>

            <label className="block text-sm text-slate-700">
              Image file
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </label>

            <button
              type="submit"
              disabled={uploading}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>

          {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Uploaded assets</h2>

          {loading ? <p className="text-sm text-slate-500">Loading...</p> : null}

          <div className="space-y-3">
            {assets.map((asset) => (
              <div key={asset._id} className="rounded-lg border border-slate-200 p-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <img
                    src={asset.url}
                    alt={asset.publicId}
                    className="h-20 w-20 rounded-md border border-slate-200 object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs text-slate-500">{asset.publicId}</p>
                    <p className="truncate text-sm font-medium text-slate-900">{asset.url}</p>
                    <p className="text-xs text-slate-500">
                      {asset.width}x{asset.height} • {(asset.bytes / 1024).toFixed(1)} KB
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => void copyUrl(asset.url)}
                      className="rounded-md bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white"
                    >
                      Copy URL
                    </button>
                    <button
                      type="button"
                      onClick={() => void onDelete(asset._id)}
                      className="rounded-md bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {!loading && assets.length === 0 ? (
              <p className="text-sm text-slate-500">No assets uploaded yet.</p>
            ) : null}
          </div>
        </section>
      </div>
    </AdminContainer>
  );
}
