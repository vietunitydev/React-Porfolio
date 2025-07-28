import React from 'react';
import { ArrowLeft } from 'lucide-react';

const ProjectDetail = ({ project, onBack }) => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-8">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Projects
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                        <h1 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            {project.title}
                        </h1>

                        <div className="mb-8">
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

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-green-400 mb-4">Game Technology</h2>

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
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
                        <div className="relative">
                            <img
                                src={project.screenshots?.[0] || ''}
                                alt={`${project.title} main screenshot`}
                                className="w-full h-auto object-contain"
                            />
                            {/*<div className="absolute inset-0 bg-black/30"></div>*/}
                            {/*<div className="absolute inset-0 flex items-center justify-center z-10">*/}
                            {/*    <div className="text-center">*/}
                            {/*        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-red-700 transition-colors cursor-pointer">*/}
                            {/*            <div className="w-0 h-0 border-l-6 border-l-white border-y-4 border-y-transparent ml-1"></div>*/}
                            {/*        </div>*/}
                            {/*        <h3 className="text-white font-bold text-lg">{project.title}</h3>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {project.screenshots?.slice(1).map((screenshot, index) => (
                            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
                                <img
                                    src={screenshot}
                                    alt={`Screenshot ${index + 1}`}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ProjectDetail;