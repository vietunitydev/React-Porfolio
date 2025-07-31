import { Calendar } from 'lucide-react';

const BlogCard = ({ post, onClick }) => {
    return (
        <div className="flex items-start gap-3 border-l-2 border-purple-500 pl-4 relative">
            <div className="absolute -left-[9px] w-4 h-4 bg-purple-500 rounded-full mt-1" />
            <div>
                <div className="flex items-center text-gray-400 text-sm mb-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                </div>
                <button
                    onClick={onClick}
                    className="text-white hover:text-purple-400 font-medium text-base transition-colors"
                >
                    {post.title}
                </button>
            </div>
        </div>
    );
};

export default BlogCard;
