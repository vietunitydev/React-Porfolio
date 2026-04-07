"use client";

import React from 'react';
import {useTranslations} from 'next-intl';
import {useRouter} from '../i18n/navigation';
import {useTheme} from '../components/context/ThemeContext.jsx';
import BlogCard from '../components/blogs/BlogCard.jsx';

/**
 * @param {{
 *   archives?: Array<{
 *     _id: string,
 *     title: string,
 *     slug: string,
 *     happenedAt: string,
 *   }>
 * }} props
 */
const ArchivesPage = ({archives = []}) => {
  const router = useRouter();
  const sortedPosts = [...archives].sort(
    (a, b) => new Date(b.happenedAt).getTime() - new Date(a.happenedAt).getTime()
  );

  const blogStylePosts = sortedPosts.map((item, index) => ({
    id: item._id || `${item.slug}-${index}`,
    title: item.title,
    slug: item.slug,
    publishedAt: item.happenedAt,
  }));

  const yearMap = new Map();
  blogStylePosts.forEach((post) => {
    const year = new Date(post.publishedAt).getFullYear();
    if (!yearMap.has(year)) {
      yearMap.set(year, post.id);
    }
  });

  const {theme} = useTheme();
  const t = useTranslations('archives');

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}
    >
      <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-6 sm:pt-8 md:pt-10">
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } mb-3 sm:mb-4 text-center`}
        >
          {t('title')}
        </h1>
        <p
          className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm sm:text-base text-center mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto px-4`}
        >
          {t('description')}
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pb-8">
        <div className="relative">
          {blogStylePosts.map((post) => {
            const year = new Date(post.publishedAt).getFullYear();
            const showYear = yearMap.get(year) === post.id;

            return (
              <BlogCard
                key={post.id}
                post={post}
                onClick={() => router.push(`/archives/${post.slug}`)}
                showYear={showYear}
              />
            );
          })}

          {blogStylePosts.length === 0 ? (
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              {t('empty')}
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default ArchivesPage;
