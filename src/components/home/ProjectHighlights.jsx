import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Users, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const ProjectHighlights = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    const featuredProjects = [
        {
            id: 1,
            title: 'MetaRush',
            description: 'Battle Royale NFT game with Photon Quantum backend. Built UI systems, controller support, and camera effects.',
            genre: 'Battle Royale (NFT)',
            teamSize: '20+',
            period: '01/2024 - 02/2025',
            tech: ['Unity', 'C#', 'Photon Quantum', 'DOTween'],
            link: 'https://metarush.myria.com',
            gradient: 'from-purple-600 to-blue-600'
        },
        {
            id: 2,
            title: 'Divine Intervention Chess',
            description: 'Chess game with AI optimization, authentication systems, and multi-platform deployment (WebGL, Android, iOS).',
            genre: 'Chess / Board Game',
            teamSize: '5',
            period: '02/2025 - 08/2025',
            tech: ['Unity', 'PlayFab', 'Photon PUN', 'Facebook Auth'],
            link: 'https://diinterplay.com',
            gradient: 'from-blue-600 to-cyan-600'
        },
        {
            id: 3,
            title: 'Chess 2D',
            description: 'Fullstack chess game with .NET backend, WebSocket server, and Unity frontend. Deployed with Docker & Nginx.',
            genre: 'Chess / Board Game',
            teamSize: 'Solo',
            period: '05/2025 - 07/2025',
            tech: ['Unity', '.NET 8', 'WebSocket', 'MongoDB', 'Docker'],
            link: 'https://github.com/vietunitydev',
            gradient: 'from-cyan-600 to-teal-600'
        },
    ];

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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-10">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
                <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Featured <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
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
                            <div className={`group ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-2xl overflow-hidden border ${theme === 'dark' ? 'border-gray-700/50 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'} transition-all duration-300 shadow-lg`}>
                                <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} group-hover:text-purple-400 transition-colors`}>
                                            {project.title}
                                        </h3>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} hover:text-purple-400 transition-colors`}
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>

                                    <div className="text-xs text-purple-400 font-semibold mb-2">
                                        {project.genre}
                                    </div>

                                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm mb-3 line-clamp-3`}>
                                        {project.description}
                                    </p>

                                    <div className={`flex items-center gap-4 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                                        <div className="flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            {project.teamSize}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {project.period.split(' - ')[0]}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.slice(0, 3).map((tech, i) => (
                                            <span
                                                key={i}
                                                className={`px-2 py-1 ${theme === 'dark' ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-700'} rounded-full text-xs`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className={`px-2 py-1 ${theme === 'dark' ? 'bg-gray-700/50 text-gray-400' : 'bg-gray-100 text-gray-600'} rounded-full text-xs`}>
                                                +{project.tech.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
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
                                    ? 'bg-purple-400 w-6'
                                    : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {featuredProjects.map((project, index) => (
                    <div
                        key={project.id}
                        className={`group ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-2xl overflow-hidden border ${theme === 'dark' ? 'border-gray-700/50 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'} transition-all duration-300 hover:transform hover:scale-105 shadow-lg`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>

                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} group-hover:text-purple-400 transition-colors`}>
                                    {project.title}
                                </h3>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} hover:text-purple-400 transition-colors`}
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </div>

                            <div className="text-sm text-purple-400 font-semibold mb-3">
                                {project.genre}
                            </div>

                            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm mb-4 line-clamp-3`}>
                                {project.description}
                            </p>

                            <div className={`flex items-center gap-4 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {project.teamSize}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {project.period.split(' - ')[0]}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {project.tech.slice(0, 3).map((tech, i) => (
                                    <span
                                        key={i}
                                        className={`px-3 py-1 ${theme === 'dark' ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-700'} rounded-full text-xs`}
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {project.tech.length > 3 && (
                                    <span className={`px-3 py-1 ${theme === 'dark' ? 'bg-gray-700/50 text-gray-400' : 'bg-gray-100 text-gray-600'} rounded-full text-xs`}>
                                        +{project.tech.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
                <button
                    onClick={() => navigate('/projects')}
                    className={`group ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm border-2 border-purple-600 text-purple-400 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105 text-sm font-semibold inline-flex items-center gap-2 shadow-lg`}
                >
                    View All Projects
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </section>
    );
};

export default ProjectHighlights;