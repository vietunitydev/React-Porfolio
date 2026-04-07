'use client';

import {FormEvent, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nextPath, setNextPath] = useState('/admin');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextValue = params.get('next');
    if (nextValue) {
      setNextPath(nextValue);
    }
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({password}),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        setError(data?.message || 'Login failed.');
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setError('Cannot login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Portfolio Admin
        </p>
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Sign in</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-700"
              placeholder="Enter admin password"
            />
          </div>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
