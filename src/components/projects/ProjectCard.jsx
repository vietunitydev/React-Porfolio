import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => (
    <div
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer group"
        onClick={onClick}
    >
        <div className="relative overflow-hidden">
            <div className="w-full h-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">{project.title}</span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {project.year}
            </div>
        </div>

        <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{project.description}</p>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    {project.year}
                </div>
                <ExternalLink className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
            </div>
        </div>
    </div>
);

export default ProjectCard;