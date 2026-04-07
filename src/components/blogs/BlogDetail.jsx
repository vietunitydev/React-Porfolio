"use client";

import { ArrowLeft, User, Clock, Calendar, Eye, Tag, List, X, ChevronRight, Type } from 'lucide-react';
import {useRouter} from "../../i18n/navigation";
import BlogCard from "./BlogCard.jsx";
import {useEffect, useState} from "react";

/**
 * @param {{
 *   post: {
 *     id: number,
 *     slug: string,
 *     title: string,
 *     author: string,
 *     publishedAt: string,
 *     readTime: string,
 *     views: number,
 *     tags: string[],
 *     content: string
 *   },
 *   relatedPosts?: Array<{
 *     id: number,
 *     slug: string,
 *     title: string,
 *     publishedAt: string
 *   }>,
 *   initialContent?: string,
 *   initialHeadings?: Array<{level: number, text: string, id: string}>
 * }} props
 */
const BlogDetail = ({ post, relatedPosts = [], initialContent = '', initialHeadings = [] }) => {
    const router = useRouter();
    const [parsedContent] = useState(initialContent);
    const [headings] = useState(initialHeadings);
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
            <div className="app-page flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold app-text-primary mb-4">Blog Post Not Found</h1>
                    <button
                        onClick={() => router.push('/blogs')}
                        className="app-btn-primary"
                    >
                        Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="app-page">

            {/* TOC Toggle Button (Both Mobile and Desktop) */}
            {headings.length > 0 && (
                <button
                    onClick={() => setShowTOC(!showTOC)}
                    className="fixed top-6 right-6 z-40 app-icon-btn h-10 w-10 sm:h-12 sm:w-12 shadow-theme-sm"
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
                <div className={`fixed top-0 right-0 h-full w-80 sm:w-96 z-40 transition-transform duration-300 border-l app-border app-surface ${
                    showTOC ? 'translate-x-0' : 'translate-x-full'
                } shadow-2xl overflow-y-auto`}>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold app-text-primary flex items-center gap-2">
                                Table of Contents
                            </h3>
                            <button
                                onClick={() => setShowTOC(false)}
                                className="app-text-secondary hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <nav>
                            {headings.map((heading) => (
                                <button
                                    key={heading.id}
                                    onClick={() => scrollToHeading(heading.id)}
                                    className={activeId === heading.id ? 'app-toc-item-active' : 'app-toc-item'}
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
                    className={`app-card overflow-hidden ${fontSizes[fontSize].class}`}
                    style={{ lineHeight: fontSize === 'sm' ? '1.6' : fontSize === 'xl' ? '1.8' : '1.7' }}
                >
                    {/* Header */}
                    <div className="p-4 sm:p-6 md:p-8 border-b app-border">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 sm:mb-4">
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="app-badge px-2 sm:px-3 py-1"
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
                                    className="app-btn-secondary flex items-center gap-2 px-3 py-1.5"
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
                                        <div className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg z-20 overflow-hidden app-surface border app-border">
                                            {Object.entries(fontSizes).map(([key, { label }]) => (
                                                <button
                                                    key={key}
                                                    onClick={() => {
                                                        setFontSize(key);
                                                        setShowFontMenu(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 transition-colors ${fontSize === key ? 'app-accent-soft' : 'app-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800'}`}
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
                            className="font-bold app-text-primary mb-3 sm:mb-4"
                            style={{ fontSize: '2em' }}
                        >
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 app-text-secondary" style={{ fontSize: '0.875em' }}>
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
                    <div className="p-4 sm:p-6 md:p-8 border-t app-border app-surface-muted">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4 sm:w-5 sm:h-5 app-link-accent" />
                                <span className="app-text-primary font-medium" style={{ fontSize: '1em' }}>Tags:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="app-badge-muted px-2 sm:px-3 py-1"
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
                        className="font-bold app-text-primary mb-4 sm:mb-6"
                        style={{ fontSize: '1.5em' }}
                    >
                        More Articles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {relatedPosts
                            .map((relatedPost) => (
                                <BlogCard key={relatedPost.id} post={relatedPost} onClick={() => router.push(`/blogs/${relatedPost.slug}`)} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;