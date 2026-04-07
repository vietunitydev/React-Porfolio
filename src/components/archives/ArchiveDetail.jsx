"use client";

import {ArrowLeft} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useRouter} from '../../i18n/navigation';
import {useTheme} from '../context/ThemeContext.jsx';

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
  const {theme} = useTheme();
  const router = useRouter();
  const t = useTranslations('archives');

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-10">
        <button
          type="button"
          onClick={() => router.push('/archives')}
          className={`inline-flex items-center gap-2 mb-6 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            theme === 'dark'
              ? 'bg-gray-700/60 text-gray-100 hover:bg-gray-700'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t('backToArchive')}
        </button>

        <article
          className={`${
            theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'
          } border rounded-2xl overflow-hidden shadow-xl`}
        >
          <header className={`px-4 sm:px-6 md:px-8 py-5 border-b ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'}`}>
            <h1 className={`text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {entry.title}
            </h1>
            <p className={`mt-2 text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
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
