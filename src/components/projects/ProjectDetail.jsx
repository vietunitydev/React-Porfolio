import React from 'react';
import { ArrowLeft, Users, Target, Calendar, Globe } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../../data/projects.js';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find(p => p.id === parseInt(id));

    if (!project) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
                    <button
                        onClick={() => navigate('/projects')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;

        // Handle YouTube URLs
        const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(youtubeRegex);
        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }

        // Handle Google Drive URLs
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
            2: 'grid-cols-2',
            3: 'grid-cols-3'
        };

        return (
            <div className={`grid ${gridCols[columns]} gap-4`}>
                {project.screenshots.map((screenshot, index) => (
                    <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 group hover:border-purple-400/50 transition-colors">
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <button
                    onClick={() => navigate('/projects')} // Sử dụng navigate thay cho onBack
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Projects
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Project Header */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                            <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                {project.title}
                            </h1>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                {project.description}
                            </p>
                        </div>

                        {/* Project Overview */}
                        {(project.mainTasks || project.teamSize || project.duration || project.platform) && (
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                                <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                                    <Target className="w-6 h-6" />
                                    Project Overview
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {project.mainTasks && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                                <Target className="w-5 h-5 text-purple-400" />
                                                Main Responsibilities
                                            </h3>
                                            <ul className="space-y-2 ml-6">
                                                {project.mainTasks.map((task, index) => (
                                                    <li key={index} className="text-gray-300 flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                                        {task}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        {project.teamSize && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                                    <Users className="w-5 h-5 text-blue-400" />
                                                    Team Size
                                                </h3>
                                                <p className="text-gray-300 ml-7">{project.teamSize}</p>
                                            </div>
                                        )}

                                        {project.duration && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                                    <Calendar className="w-5 h-5 text-green-400" />
                                                    Duration
                                                </h3>
                                                <p className="text-gray-300 ml-7">{project.duration}</p>
                                            </div>
                                        )}

                                        {project.platform && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                                    <Globe className="w-5 h-5 text-yellow-400" />
                                                    Platform
                                                </h3>
                                                <p className="text-gray-300 ml-7">{project.platform}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Game Features */}
                        {project.features && (
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                                <h2 className="text-2xl font-bold text-green-400 mb-4">Game Features</h2>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-white">In-game Features:</h3>
                                    <ul className="space-y-2 ml-6">
                                        {project.features.map((feature, index) => (
                                            <li key={index} className="text-gray-300 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Game Technology */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                            <h2 className="text-2xl font-bold text-green-400 mb-4">Game Technology</h2>

                            {project.designPatterns && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-white mb-3">Design Pattern:</h3>
                                    <ul className="space-y-2 ml-6">
                                        {project.designPatterns.map((pattern, index) => (
                                            <li key={index} className="text-gray-300 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                                {pattern}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {project.technologies && (
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-3">Technologies:</h3>
                                    <ul className="space-y-2 ml-6">
                                        {project.technologies.map((tech, index) => (
                                            <li key={index} className="text-gray-300 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Media Section */}
                    <div className="space-y-6">
                        {/* Video Section */}
                        {project.videoUrl && (
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
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
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white">Screenshots</h3>
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