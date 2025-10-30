import {blogPosts} from "../../data/blogPosts.js";
import {parseMarkdown} from "../../hook/parseMarkdown.js";
import { ArrowLeft, User, Clock, Calendar, Eye, Tag } from 'lucide-react';
import {useNavigate, useParams} from "react-router-dom";
import BlogCard from "./BlogCard.jsx";
import {useEffect, useState} from "react";
import { useTheme } from '../context/ThemeContext.jsx';

const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const post = blogPosts.find(p => p.slug === slug || p.id.toString() === slug);
    const [parsedContent, setParsedContent] = useState("");

    useEffect(() => {
        const loadMarkdown = async () => {
            if (post?.contentPath) {
                const response = await fetch(post.contentPath);
                const mdText = await response.text();
                const html = parseMarkdown(mdText);
                setParsedContent(html);
            }
        };
        loadMarkdown();
    }, [post]);

    if (!post) {
        return (
            <div className={`min-h-screen ${theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'} flex items-center justify-center px-4`}>
                <div className="text-center">
                    <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Blog Post Not Found</h1>
                    <button
                        onClick={() => navigate('/blogs')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
                    >
                        Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
                <button
                    onClick={() => navigate('/blogs')}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 sm:mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm sm:text-base">Back to Blog</span>
                </button>

                <article className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-2xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'} overflow-hidden shadow-xl`}>
                    {/* Header */}
                    <div className={`p-4 sm:p-6 md:p-8 border-b ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'}`}>
                        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                            {post.tags.map((tag, index) => (
                                <span key={index} className={`px-2 sm:px-3 py-1 ${theme === 'dark' ? 'bg-purple-600/20 text-purple-300' : 'bg-purple-100 text-purple-600'} rounded-full text-xs sm:text-sm`}>
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3 sm:mb-4`}>{post.title}</h1>

                        <div className={`flex flex-wrap items-center gap-3 sm:gap-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm`}>
                            <div className="flex items-center gap-1 sm:gap-2">
                                <User className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">{new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                                <span className="sm:hidden">{new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{post.readTime}</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2">
                                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{post.views} views</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 md:p-8">
                        <div
                            className={`prose prose-sm sm:prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />
                    </div>

                    {/* Footer */}
                    <div className={`p-4 sm:p-6 md:p-8 border-t ${theme === 'dark' ? 'border-gray-700/50 bg-gray-900/30' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                                <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium text-sm sm:text-base`}>Tags:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, index) => (
                                    <span key={index} className={`px-2 sm:px-3 py-1 ${theme === 'dark' ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-200 text-gray-700'} rounded-full text-xs sm:text-sm`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related Posts */}
                <div className="mt-8 sm:mt-12">
                    <h2 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 sm:mb-6`}>More Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {blogPosts
                            .filter(p => p.id !== post.id)
                            .slice(0, 2)
                            .map((relatedPost) => (
                                <BlogCard key={relatedPost.id} post={relatedPost} onClick={() => navigate(`/blogs/${relatedPost.slug}`)} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;