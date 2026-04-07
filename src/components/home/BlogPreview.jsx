import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../../i18n/navigation';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Button from '../primitives/Button.jsx';
import Card from '../primitives/Card.jsx';
import SectionContainer from '../primitives/SectionContainer.jsx';

/**
 * @param {{
 *   blogPosts?: Array<any>
 * }} props
 */
const BlogPreview = ({ blogPosts = [] }) => {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    const latestBlogs = [...blogPosts]
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, 3)
        .map((blog) => ({
            id: blog.id,
            slug: blog.slug,
            title: blog.title,
            excerpt: blog.excerpt,
            category: blog.tags?.[0] || 'Blog',
            date: blog.publishedAt,
            readTime: blog.readTime,
        }));

    // Detect mobile screen
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle scroll for mobile
    useEffect(() => {
        if (!isMobile || !scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const itemWidth = container.offsetWidth;
            const index = Math.round(scrollLeft / itemWidth);
            setCurrentIndex(index);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    // Touch swipe handling
    useEffect(() => {
        if (!isMobile || !scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        let touchStartX = 0;
        let touchEndX = 0;

        const handleTouchStart = (e) => {
            touchStartX = e.touches[0].clientX;
        };

        const handleTouchMove = (e) => {
            touchEndX = e.touches[0].clientX;
        };

        const handleTouchEnd = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && currentIndex < latestBlogs.length - 1) {
                    // Swipe left - next
                    scrollToIndex(currentIndex + 1);
                } else if (diff < 0 && currentIndex > 0) {
                    // Swipe right - previous
                    scrollToIndex(currentIndex - 1);
                }
            }
        };

        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchmove', handleTouchMove);
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isMobile, currentIndex, latestBlogs.length]);

    const scrollToIndex = (index) => {
        if (scrollContainerRef.current) {
            const itemWidth = scrollContainerRef.current.offsetWidth;
            scrollContainerRef.current.scrollTo({
                left: itemWidth * index,
                behavior: 'smooth'
            });
        }
    };

    return (
        <SectionContainer width="full" spacing="default" className="app-panel">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold app-text-primary mb-4">
                    My Blog
                </h2>
            </div>

            {/* Mobile: Swipeable single item */}
            <div className="md:hidden mb-8">
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {latestBlogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="flex-shrink-0 w-full snap-center px-2"
                        >
                            <Card
                                hover
                                padding="none"
                                className="group overflow-hidden cursor-pointer"
                                onClick={() => router.push(`/blogs/${blog.slug}`)}
                            >
                                <div className="p-4">
                                    <span className="app-badge-muted px-2 py-1 mb-2">
                                        {blog.category}
                                    </span>

                                    <h3 className="text-lg font-bold app-text-primary mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>

                                    <p className="app-text-secondary text-sm mb-3 line-clamp-3">
                                        {blog.excerpt}
                                    </p>

                                    <div className="flex items-center gap-3 text-xs app-text-muted mb-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {blog.readTime}
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t app-border">
                                        <div className="flex items-center gap-2 app-text-secondary text-sm font-semibold group-hover:gap-3 transition-all">
                                            Read More
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-4">
                    {latestBlogs.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === currentIndex
                                    ? 'bg-gray-700 dark:bg-gray-300 w-6'
                                    : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
                {latestBlogs.map((blog, index) => (
                    <Card
                        key={blog.id}
                        hover
                        padding="none"
                        className="group overflow-hidden hover:scale-105 cursor-pointer"
                        onClick={() => router.push(`/blogs/${blog.slug}`)}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="p-6">
                            <span className="app-badge-muted mb-3">
                                {blog.category}
                            </span>

                            <h3 className="text-xl font-bold app-text-primary mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors line-clamp-2">
                                {blog.title}
                            </h3>

                            <p className="app-text-secondary text-sm mb-4 line-clamp-3">
                                {blog.excerpt}
                            </p>

                            <div className="flex items-center gap-4 text-xs app-text-muted">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {blog.readTime}
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t app-border">
                                <div className="flex items-center gap-2 app-text-secondary text-sm font-semibold group-hover:gap-3 transition-all">
                                    Read More
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* View All Blogs Button */}
            <div className="text-center">
                <Button
                    onClick={() => router.push('/blogs')}
                    variant="secondary"
                    className="group rounded-full transform hover:scale-105"
                >
                    View All Blogs
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </SectionContainer>
    );
};

export default BlogPreview;