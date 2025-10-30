import React from 'react';
import { blogPosts } from '../data/blogPosts.js';
import BlogCard from "../components/blogs/BlogCard.jsx";
import { useNavigate } from "react-router-dom";
import { useTheme } from '../components/context/ThemeContext.jsx';

const BlogPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();

    const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    // Tạo map để track năm đã hiển thị
    const yearMap = new Map();
    sortedPosts.forEach(post => {
        const year = new Date(post.publishedAt).getFullYear();
        if (!yearMap.has(year)) {
            yearMap.set(year, post.id);
        }
    });

    return (
        <div className={`min-h-screen ${theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'}`}>
            <section className="max-w-4xl mx-auto px-20 pt-10">
                <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 text-center`}>Blogs</h1>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-center mb-12 max-w-2xl mx-auto`}>
                    Insights about game development, technical tutorials, and my journey as a Unity developer.
                    Learn from real-world projects and industry best practices.
                </p>
            </section>
            <section className="max-w-4xl px-20">
                <div className="relative">
                    {sortedPosts.map((post) => {
                        const year = new Date(post.publishedAt).getFullYear();
                        const showYear = yearMap.get(year) === post.id;

                        return (
                            <BlogCard
                                key={post.id}
                                post={post}
                                onClick={() => navigate(`/blogs/${post.slug}`)}
                                showYear={showYear}
                            />
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default BlogPage;