import { BookOpen, Clock, Eye, Calendar, User } from 'lucide-react';

const BlogCard = ({ post, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="group block w-full text-left"
        >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-purple-400" />
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{new Date(post.publishedAt).toLocaleDateString()}</span>
                        <span className="text-gray-400">•</span>
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{post.readTime}</span>
                        <span className="text-gray-400">•</span>
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{post.views} views</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {post.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{post.author}</span>
                    </div>
                </div>
            </div>
        </button>
    );
};
export default BlogCard;