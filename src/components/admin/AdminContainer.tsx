'use client';

import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {ReactNode, useState} from 'react';

type AdminContainerProps = {
  title: string;
  children: ReactNode;
};

const navItems = [
  {href: '/admin', label: 'Dashboard'},
  {href: '/admin/projects', label: 'Projects'},
  {href: '/admin/blogs', label: 'Blogs'},
  {href: '/admin/media', label: 'Media'},
];

export default function AdminContainer({title, children}: AdminContainerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      });
    } finally {
      router.push('/admin/login');
      router.refresh();
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Portfolio Admin
            </p>
            <h1 className="text-xl font-bold text-slate-900">{title}</h1>
          </div>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="rounded-md bg-rose-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
