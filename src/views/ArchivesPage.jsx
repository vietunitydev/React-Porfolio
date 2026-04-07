"use client";

import React from 'react';
import {useTranslations} from 'next-intl';
import {useRouter} from '../i18n/navigation';
import BlogCard from '../components/blogs/BlogCard.jsx';
import SectionContainer from '../components/primitives/SectionContainer.jsx';

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

  const t = useTranslations('archives');

  return (
    <div className="app-page">
      <SectionContainer width="content" spacing="compact" className="pb-4">
        <h1 className="app-section-title">
          {t('title')}
        </h1>
        <p className="app-section-description max-w-3xl">
          {t('description')}
        </p>
      </SectionContainer>

      <SectionContainer width="narrow" spacing="compact" className="pt-0">
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
            <p className="app-text-muted text-sm">
              {t('empty')}
            </p>
          ) : null}
        </div>
      </SectionContainer>
    </div>
  );
};

export default ArchivesPage;
