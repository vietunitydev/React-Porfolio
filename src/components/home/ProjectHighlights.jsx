import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Users, Calendar } from 'lucide-react';

const ProjectHighlights = () => {
    const navigate = useNavigate();

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

    return (
        <section className="max-w-7xl mx-auto px-20 py-10">
            <div className="text-center mb-16">
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-4">
                    Featured <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
                </h2>
                {/*<p className="text-gray-400 text-lg max-w-2xl mx-auto">*/}
                {/*    Showcasing my journey from indie games to large-scale team projects*/}
                {/*</p>*/}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {featuredProjects.slice(0, 6).map((project, index) => (
                    <div
                        key={project.id}
                        className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Header với gradient */}
                        <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>

                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                    {project.title}
                                </h3>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-purple-400 transition-colors"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </div>

                            <div className="text-sm text-purple-400 font-semibold mb-3">
                                {project.genre}
                            </div>

                            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                                {project.description}
                            </p>

                            {/* Meta info */}
                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {project.teamSize}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {project.period.split(' - ')[0]}
                                </div>
                            </div>

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-2">
                                {project.tech.slice(0, 3).map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs"
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {project.tech.length > 3 && (
                                    <span className="px-3 py-1 bg-gray-700/50 text-gray-400 rounded-full text-xs">
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
                    className="group bg-gray-800/50 backdrop-blur-sm border-2 border-purple-600 text-purple-400 px-4 py-1.5 rounded-full hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105 text-sm font-semibold inline-flex items-center gap-2"
                >
                    View All Projects
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </section>
    );
};

export default ProjectHighlights;