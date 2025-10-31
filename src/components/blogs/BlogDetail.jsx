import {blogPosts} from "../../data/blogPosts.js";
import {parseMarkdown, extractHeadings} from "../../hook/parseMarkdown.js";
import { ArrowLeft, User, Clock, Calendar, Eye, Tag, List, X, ChevronRight, Type } from 'lucide-react';
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
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState("");
    const [showTOC, setShowTOC] = useState(false);
    const [fontSize, setFontSize] = useState('sm'); // 'sm', 'base', 'lg', 'xl'
    const [showFontMenu, setShowFontMenu] = useState(false);

    const fontSizes = {
        sm: { label: 'Small', class: 'text-sm' },
        base: { label: 'Medium', class: 'text-base' },
        lg: { label: 'Large', class: 'text-lg' },
        xl: { label: 'Extra Large', class: 'text-xl' }
    };

    useEffect(() => {
        const loadMarkdown = async () => {
            if (post?.contentPath) {
                const response = await fetch(post.contentPath);
                const mdText = await response.text();
                const html = parseMarkdown(mdText);
                const toc = extractHeadings(mdText);
                setParsedContent(html);
                setHeadings(toc);
            }
        };
        loadMarkdown();
    }, [post]);

    // Track active heading on scroll
    useEffect(() => {
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-100px 0px -80% 0px'
            }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    const scrollToHeading = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setShowTOC(false); // Close TOC on mobile after click
        }
    };

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

            {/* TOC Toggle Button (Both Mobile and Desktop) */}
            {headings.length > 0 && (
                <button
                    onClick={() => setShowTOC(!showTOC)}
                    className={`fixed top-6 right-6 z-40 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-900' : 'bg-gray-200 hover:bg-gray-300'} ${theme === 'dark' ? 'text-white' : 'text-gray-900'} p-1.5 sm:p-2.5 rounded-full shadow-lg transition-all`}
                    aria-label="Toggle Table of Contents"
                >
                    {showTOC ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <List className="w-5 h-5 sm:w-6 sm:h-6" />}
                </button>
            )}

            {/* TOC Overlay (Both Mobile and Desktop) */}
            {showTOC && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={() => setShowTOC(false)}
                />
            )}

            {/* TOC Panel (Both Mobile and Desktop) */}
            {headings.length > 0 && (
                <div className={`fixed top-0 right-0 h-full w-80 sm:w-96 z-40 transition-transform duration-300 ${
                    showTOC ? 'translate-x-0' : 'translate-x-full'
                } ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-2xl overflow-y-auto`}>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
                                {/*<List className="w-5 h-5 text-purple-400" />*/}
                                Table of Contents
                            </h3>
                            <button
                                onClick={() => setShowTOC(false)}
                                className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <nav>
                            {headings.map((heading) => (
                                <button
                                    key={heading.id}
                                    onClick={() => scrollToHeading(heading.id)}
                                    className={`w-full text-left py-2 px-3 rounded-lg transition-colors text-sm ${
                                        activeId === heading.id
                                            ? theme === 'dark'
                                                ? 'bg-purple-600/20 text-purple-400 border-l-2 border-purple-400'
                                                : 'bg-purple-100 text-purple-600 border-l-2 border-purple-600'
                                            : theme === 'dark'
                                                ? 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                    style={{ paddingLeft: `${(heading.level - 1) * 12 + 12}px` }}
                                >
                                    <span className="flex items-center gap-2">
                                        {activeId === heading.id && (
                                            <ChevronRight className="w-3 h-3 flex-shrink-0" />
                                        )}
                                        <span className="truncate">{heading.text}</span>
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
                {/* Main Content */}
                <article
                    className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-2xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'} overflow-hidden shadow-xl ${fontSizes[fontSize].class}`}
                    style={{ lineHeight: fontSize === 'sm' ? '1.6' : fontSize === 'xl' ? '1.8' : '1.7' }}
                >
                    {/* Header */}
                    <div className={`p-4 sm:p-6 md:p-8 border-b ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'}`}>
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 sm:mb-4">
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className={`px-2 sm:px-3 py-1 ${theme === 'dark' ? 'bg-purple-600/20 text-purple-300' : 'bg-purple-100 text-purple-600'} rounded-full font-semibold`}
                                        style={{ fontSize: '0.75em' }}
                                    >
                                                #{tag}
                                            </span>
                                ))}
                            </div>

                            {/* Font Size Selector */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowFontMenu(!showFontMenu)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                                        theme === 'dark'
                                            ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300'
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                    }`}
                                    style={{ fontSize: '0.875em' }}
                                    aria-label="Change font size"
                                >
                                    <Type className="w-4 h-4" />
                                    <span className="font-medium">{fontSizes[fontSize].label}</span>
                                </button>

                                {showFontMenu && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setShowFontMenu(false)}
                                        />
                                        <div className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg z-20 overflow-hidden ${
                                            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                                        }`}>
                                            {Object.entries(fontSizes).map(([key, { label }]) => (
                                                <button
                                                    key={key}
                                                    onClick={() => {
                                                        setFontSize(key);
                                                        setShowFontMenu(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 transition-colors ${
                                                        fontSize === key
                                                            ? theme === 'dark'
                                                                ? 'bg-purple-600/20 text-purple-400'
                                                                : 'bg-purple-100 text-purple-600'
                                                            : theme === 'dark'
                                                                ? 'text-gray-300 hover:bg-gray-700'
                                                                : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                    style={{ fontSize: '0.875em' }}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <h1
                            className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3 sm:mb-4`}
                            style={{ fontSize: '2em' }}
                        >
                            {post.title}
                        </h1>

                        <div className={`flex flex-wrap items-center gap-3 sm:gap-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontSize: '0.875em' }}>
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
                            className="max-w-none"
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />
                    </div>

                    {/* Footer */}
                    <div className={`p-4 sm:p-6 md:p-8 border-t ${theme === 'dark' ? 'border-gray-700/50 bg-gray-900/30' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                                <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`} style={{ fontSize: '1em' }}>Tags:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className={`px-2 sm:px-3 py-1 ${theme === 'dark' ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-200 text-gray-700'} rounded-full`}
                                        style={{ fontSize: '0.875em' }}
                                    >
                                                {tag}
                                            </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related Posts */}
                <div className="mt-8 sm:mt-12">
                    <h2
                        className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 sm:mb-6`}
                        style={{ fontSize: '1.5em' }}
                    >
                        More Articles
                    </h2>
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