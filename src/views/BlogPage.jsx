"use client";

import React from 'react';
import BlogCard from "../components/blogs/BlogCard.jsx";
import { useRouter } from '../i18n/navigation';
import SectionContainer from '../components/primitives/SectionContainer.jsx';

/**
 * @param {{
 *   blogPosts?: Array<any>
 * }} props
 */
const BlogPage = ({ blogPosts = [] }) => {
    const router = useRouter();

    const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    const yearMap = new Map();
    sortedPosts.forEach(post => {
        const year = new Date(post.publishedAt).getFullYear();
        if (!yearMap.has(year)) {
            yearMap.set(year, post.id);
        }
    });

    return (
        <div className="app-page">
            <SectionContainer width="narrow" spacing="compact" className="pb-4">
                <h1 className="app-section-title">Blogs</h1>
                <p className="app-section-description max-w-2xl">
                    Insights about game development, technical tutorials, and my journey as a Unity developer.
                    Learn from real-world projects and industry best practices.
                </p>
            </SectionContainer>
            <SectionContainer width="narrow" spacing="compact" className="pt-0">
                <div className="relative">
                    {sortedPosts.map((post) => {
                        const year = new Date(post.publishedAt).getFullYear();
                        const showYear = yearMap.get(year) === post.id;

                        return (
                            <BlogCard
                                key={post.id}
                                post={post}
                                onClick={() => router.push(`/blogs/${post.slug}`)}
                                showYear={showYear}
                            />
                        );
                    })}
                </div>
            </SectionContainer>
        </div>
    );
};

export default BlogPage;