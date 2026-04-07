import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../../i18n/navigation';
import { ExternalLink, Users, Calendar } from 'lucide-react';
import Button from '../primitives/Button.jsx';
import Card from '../primitives/Card.jsx';
import SectionContainer from '../primitives/SectionContainer.jsx';

/**
 * @param {{
 *   projects?: Array<any>
 * }} props
 */
const ProjectHighlights = ({ projects = [] }) => {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    const featuredProjects = projects.slice(0, 3).map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        genre: project.platform || 'Project',
        teamSize: project.teamSize || '-',
        period: project.duration || '-',
        tech: project.technologies || [],
        link: project.videoUrl || `/projects/${project.id}`
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
                if (diff > 0 && currentIndex < featuredProjects.length - 1) {
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
    }, [isMobile, currentIndex, featuredProjects.length]);

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
        <SectionContainer width="full" spacing="default">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold app-text-primary mb-4">
                    Featured Projects
                </h2>
            </div>

            {/* Mobile: Swipeable single item */}
            <div className="md:hidden mb-8">
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {featuredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="flex-shrink-0 w-full snap-center px-2"
                        >
                            <Card hover padding="none" className="group overflow-hidden">
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-bold app-text-primary group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                                            {project.title}
                                        </h3>
                                        <a
                                            href={project.link}
                                            target={project.link.startsWith('http') ? '_blank' : undefined}
                                            rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className="app-text-secondary hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>

                                    <div className="text-xs app-text-secondary font-semibold mb-2">
                                        {project.genre}
                                    </div>

                                    <p className="app-text-secondary text-sm mb-3 line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center gap-4 text-xs app-text-muted mb-3">
                                        <div className="flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            {project.teamSize}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {project.period.split(' - ')[0] || '-'}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.slice(0, 3).map((tech, i) => (
                                            <span
                                                key={i}
                                                className="app-badge-muted px-2 py-1"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className="app-badge-muted px-2 py-1">
                                                +{project.tech.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-4">
                    {featuredProjects.map((_, index) => (
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
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {featuredProjects.map((project, index) => (
                    <Card
                        key={project.id}
                        hover
                        padding="none"
                        className="group overflow-hidden hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xl font-bold app-text-primary group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                                    {project.title}
                                </h3>
                                <a
                                    href={project.link}
                                    target={project.link.startsWith('http') ? '_blank' : undefined}
                                    rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="app-text-secondary hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </div>

                            <div className="text-sm app-text-secondary font-semibold mb-3">
                                {project.genre}
                            </div>

                            <p className="app-text-secondary text-sm mb-4 line-clamp-3">
                                {project.description}
                            </p>

                            <div className="flex items-center gap-4 text-xs app-text-muted mb-4">
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {project.teamSize}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {project.period.split(' - ')[0] || '-'}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {project.tech.slice(0, 3).map((tech, i) => (
                                    <span
                                        key={i}
                                        className="app-badge-muted"
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {project.tech.length > 3 && (
                                    <span className="app-badge-muted">
                                        +{project.tech.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
                <Button
                    onClick={() => router.push('/projects')}
                    variant="secondary"
                    className="group rounded-full transform hover:scale-105"
                >
                    View All Projects
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
            </div>
        </SectionContainer>
    );
};

export default ProjectHighlights;