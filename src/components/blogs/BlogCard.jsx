import { Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const BlogCard = ({ post, onClick, showYear }) => {
    const { theme } = useTheme();
    const date = new Date(post.publishedAt);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'short' });

    return (
        <div className="relative mb-5">
            {showYear && (
                <div className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                    {date.getFullYear()}
                </div>
            )}

            <div className="flex items-center gap-2 relative min-h-[2rem]">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-gray-700/20 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-300/20 to-transparent'}`} />

                <div className={`w-24 text-right z-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="text-sm font-semibold font-mono">{day} {month}</div>
                </div>

                <div className="relative flex items-center z-10">
                    <div className={`w-3 h-3 rounded-full ${theme === 'dark' ? 'bg-gray-500' : 'bg-gray-400'}`} />
                    <div className={`w-0.5 h-10 absolute top-3 left-1/2 -translate-x-1/2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
                </div>

                <div className="flex-1 z-10 flex items-center">
                    <button
                        onClick={onClick}
                        className={`${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} font-medium text-lg transition-colors text-left py-0`}
                    >
                        {post.title}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;