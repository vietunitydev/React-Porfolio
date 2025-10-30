import React from 'react';
import { ArrowLeft, Users, Target, Calendar, Globe } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../../data/projects.js';
import { useTheme } from '../context/ThemeContext.jsx';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const project = projects.find(p => p.id === parseInt(id));

    if (!project) {
        return (
            <div className={`min-h-screen ${theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'} flex items-center justify-center px-4`}>
                <div className="text-center">
                    <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Project Not Found</h1>
                    <button
                        onClick={() => navigate('/projects')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;

        const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(youtubeRegex);
        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }

        if (url.includes('drive.google.com')) {
            const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
            if (fileId && fileId[1]) {
                return `https://drive.google.com/file/d/${fileId[1]}/preview`;
            }
        }

        return url;
    };

    const renderScreenshots = () => {
        if (!project.screenshots || project.screenshots.length === 0) return null;

        const columns = project.screenshotColumns || 2;
        const gridCols = {
            1: 'grid-cols-1',
            2: 'grid-cols-1 sm:grid-cols-2',
            3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        };

        return (
            <div className={`grid ${gridCols[columns]} gap-3 sm:gap-4`}>
                {project.screenshots.map((screenshot, index) => (
                    <div key={index} className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl overflow-hidden border ${theme === 'dark' ? 'border-gray-700/50 hover:border-purple-400/50' : 'border-gray-200 hover:border-purple-400'} group transition-colors shadow-lg`}>
                        <img
                            src={screenshot}
                            alt={`Screenshot ${index + 1}`}
                            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={`min-h-screen ${theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <button
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-6 sm:mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm sm:text-base">Back to Projects</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        {/* Project Header */}
                        <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'} shadow-xl`}>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                {project.title}
                            </h1>
                            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6`}>
                                {project.description}
                            </p>
                        </div>

                        {/* Project Overview */}
                        {(project.mainTasks || project.teamSize || project.duration || project.platform) && (
                            <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'} shadow-xl`}>
                                <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-4 sm:mb-6 flex items-center gap-2">
                                    <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                                    Project Overview
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    {project.mainTasks && (
                                        <div>
                                            <h3 className={`text-base sm:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2 sm:mb-3 flex items-center gap-2`}>
                                                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                                                Main Responsibilities
                                            </h3>
                                            <ul className="space-y-2 ml-4 sm:ml-6">
                                                {project.mainTasks.map((task, index) => (
                                                    <li key={index} className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} flex items-start gap-2 text-sm sm:text-base`}>
                                                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                                        <span>{task}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="space-y-3 sm:space-y-4">
                                        {project.teamSize && (
                                            <div>
                                                <h3 className={`text-base sm:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-1 sm:mb-2 flex items-center gap-2`}>
                                                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                                                    Team Size
                                                </h3>
                                                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} ml-6 sm:ml-7 text-sm sm:text-base`}>{project.teamSize}</p>
                                            </div>
                                        )}

                                        {project.duration && (
                                            <div>
                                                <h3 className={`text-base sm:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-1 sm:mb-2 flex items-center gap-2`}>
                                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                                                    Duration
                                                </h3>
                                                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} ml-6 sm:ml-7 text-sm sm:text-base`}>{project.duration}</p>
                                            </div>
                                        )}

                                        {project.platform && (
                                            <div>
                                                <h3 className={`text-base sm:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-1 sm:mb-2 flex items-center gap-2`}>
                                                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                                                    Platform
                                                </h3>
                                                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} ml-6 sm:ml-7 text-sm sm:text-base`}>{project.platform}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Game Features */}
                        {project.features && (
                            <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'} shadow-xl`}>
                                <h2 className="text-xl sm:text-2xl font-bold text-green-400 mb-3 sm:mb-4">Game Features</h2>
                                <div className="space-y-2">
                                    <h3 className={`text-base sm:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>In-game Features:</h3>
                                    <ul className="space-y-2 ml-4 sm:ml-6">
                                        {project.features.map((feature, index) => (
                                            <li key={index} className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} flex items-start gap-2 text-sm sm:text-base`}>
                                                <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Game Technology */}
                        <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'} shadow-xl`}>
                            <h2 className="text-xl sm:text-2xl font-bold text-green-400 mb-3 sm:mb-4">Game Technology</h2>

                            {project.designPatterns && (
                                <div className="mb-4 sm:mb-6">
                                    <h3 className={`text-base sm:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2 sm:mb-3`}>Design Pattern:</h3>
                                    <ul className="space-y-2 ml-4 sm:ml-6">
                                        {project.designPatterns.map((pattern, index) => (
                                            <li key={index} className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} flex items-start gap-2 text-sm sm:text-base`}>
                                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                                <span>{pattern}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {project.technologies && (
                                <div>
                                    <h3 className={`text-base sm:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2 sm:mb-3`}>Technologies:</h3>
                                    <ul className="space-y-2 ml-4 sm:ml-6">
                                        {project.technologies.map((tech, index) => (
                                            <li key={index} className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} flex items-start gap-2 text-sm sm:text-base`}>
                                                <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                                <span>{tech}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Media Section */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Video Section */}
                        {project.videoUrl && (
                            <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl overflow-hidden border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'} shadow-xl`}>
                                <div className="relative pb-[56.25%] h-0">
                                    <iframe
                                        src={getYouTubeEmbedUrl(project.videoUrl)}
                                        title={`${project.title} video`}
                                        className="absolute top-0 left-0 w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}

                        {/* Screenshots */}
                        {project.screenshots && project.screenshots.length > 0 && (
                            <div className="space-y-3 sm:space-y-4">
                                <h3 className={`text-lg sm:text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Screenshots</h3>
                                {renderScreenshots()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;