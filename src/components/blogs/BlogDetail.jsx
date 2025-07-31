import {blogPosts} from "../../data/blogPosts.js";
import {parseMarkdown} from "../../hook/parseMardown.js";
import { ArrowLeft, User, Clock, Calendar, Eye, Tag } from 'lucide-react';
import {useNavigate, useParams} from "react-router-dom";
import BlogCard from "./BlogCard.jsx";

const BlogDetail = () => {

    const { slug } = useParams();
    const navigate = useNavigate();
    const post = blogPosts.find(p => p.slug === slug || p.id.toString() === slug);

    if (!post) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
                    <button
                        onClick={() => navigate('/blog')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <button
                    onClick={() => navigate('/blog')}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Blog
                </button>

                <article className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
                    {/* Header */}
                    <div className="p-8 border-b border-gray-700/50">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>

                        <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                <span>{post.views} views</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <div
                            className="prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
                        />
                    </div>

                    {/* Footer */}
                    <div className="p-8 border-t border-gray-700/50 bg-gray-900/30">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Tag className="w-5 h-5 text-purple-400" />
                                <span className="text-white font-medium">Tags:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related Posts */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-white mb-6">More Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {blogPosts
                            .filter(p => p.id !== post.id)
                            .slice(0, 2)
                            .map((relatedPost) => (
                                <BlogCard key={relatedPost.id} post={relatedPost} navigate={navigate} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;