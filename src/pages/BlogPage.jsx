import React from 'react';
import { blogPosts } from '../data/blogPosts.js';
import BlogCard from "../components/blogs/BlogCard.jsx";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <section className="max-w-6xl mx-auto px-20 py-10">
                <h1 className="text-4xl font-bold text-white mb-4 text-center">Blog</h1>
                <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
                    Insights about game development, technical tutorials, and my journey as a Unity developer.
                    Learn from real-world projects and industry best practices.
                </p>

                <div className="grid grid-cols-1 gap-8">
                    {blogPosts.map((post) => (
                        <BlogCard
                            key={post.id}
                            post={post}
                            onClick={() => navigate(`/blogs/${post.slug}`)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BlogPage;