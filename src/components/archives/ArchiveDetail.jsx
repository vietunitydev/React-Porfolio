"use client";

import {ArrowLeft} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useRouter} from '../../i18n/navigation';

/**
 * @param {{
 *   entry: {
 *     title: string,
 *     happenedAt: string,
 *   },
 *   initialContent?: string,
 * }} props
 */
const ArchiveDetail = ({entry, initialContent = ''}) => {
  const router = useRouter();
  const t = useTranslations('archives');

  return (
    <div className="app-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-10">
        <button
          type="button"
          onClick={() => router.push('/archives')}
          className="app-btn-secondary inline-flex items-center gap-2 mb-6 rounded-md px-3 py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('backToArchive')}
        </button>

        <article className="app-card overflow-hidden shadow-theme-md">
          <header className="px-4 sm:px-6 md:px-8 py-5 border-b app-border">
            <h1 className="text-2xl sm:text-3xl font-bold app-text-primary">
              {entry.title}
            </h1>
            <p className="mt-2 text-xs sm:text-sm app-text-muted">
              {new Date(entry.happenedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </header>

          <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
            <div dangerouslySetInnerHTML={{__html: initialContent}} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArchiveDetail;
