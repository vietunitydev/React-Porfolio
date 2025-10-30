import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

const BlogPreview = () => {
    const navigate = useNavigate();

    const latestBlogs = [
        {
            id: 1,
            title: 'Optimizing Unity Game Performance: Best Practices',
            excerpt: 'Learn essential techniques for improving game performance, from object pooling to memory management and draw call optimization.',
            category: 'Performance',
            date: '2025-10-15',
            readTime: '8 min read',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            id: 2,
            title: 'Building Multiplayer Games with Photon Quantum',
            excerpt: 'A comprehensive guide to implementing real-time multiplayer features using Photon Quantum in Unity projects.',
            category: 'Networking',
            date: '2025-09-28',
            readTime: '12 min read',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            id: 3,
            title: 'Design Patterns Every Unity Developer Should Know',
            excerpt: 'Exploring Singleton, Object Pooling, Observer, and Factory patterns with practical Unity implementations.',
            category: 'Architecture',
            date: '2025-09-10',
            readTime: '10 min read',
            gradient: 'from-cyan-500 to-teal-500'
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-20 py-10 bg-gray-900/30 backdrop-blur-sm">
            <div className="text-center mb-16">
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-4">
                    My <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Blog</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {latestBlogs.map((blog, index) => (
                    <div
                        key={blog.id}
                        className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                        onClick={() => navigate(`/blogs/${blog.id}`)}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Gradient Header */}
                        {/*<div className={`h-40 bg-gradient-to-r ${blog.gradient} relative overflow-hidden`}>*/}
                        {/*    <div className="absolute inset-0 bg-black/20"></div>*/}
                        {/*    <div className="absolute inset-0 flex items-center justify-center">*/}
                        {/*        <BookOpen className="w-16 h-16 text-white/30" />*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="p-6">
                            {/* Category Badge */}
                            <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold mb-3">
                                {blog.category}
                            </span>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                                {blog.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                {blog.excerpt}
                            </p>

                            {/* Meta Info */}
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {blog.readTime}
                                </div>
                            </div>

                            {/* Read More */}
                            <div className="mt-4 pt-4 border-t border-gray-700/50">
                                <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold group-hover:gap-3 transition-all">
                                    Read More
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Blogs Button */}
            <div className="text-center">
                <button
                    onClick={() => navigate('/blogs')}
                    className="group bg-gray-800/50 backdrop-blur-sm border-2 border-cyan-600 text-cyan-400 px-4 py-1.5 rounded-full hover:bg-cyan-600 hover:text-white transition-all transform hover:scale-105 text-sm font-semibold inline-flex items-center gap-2"
                >
                    View All Blogs
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </section>
    );
};

export default BlogPreview;