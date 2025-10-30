import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const ProjectCard = ({ project, onClick }) => {
    const { theme } = useTheme();

    return (
        <div
            className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl overflow-hidden border ${theme === 'dark' ? 'border-gray-700/50 hover:border-purple-500/50' : 'border-gray-200 hover:border-purple-400'} transition-all duration-300 transform hover:scale-101 hover:shadow-2xl cursor-pointer group`}
            onClick={onClick}
        >
            <div className="flex h-32 sm:h-40 md:h-48">
                {/* Image */}
                <div className="relative overflow-hidden w-32 sm:w-48 md:w-64 flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                        <img
                            src={project.screenshots[0]}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 bg-purple-600 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 rounded-full text-xs sm:text-sm font-semibold">
                        {project.year}
                    </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col justify-between min-w-0">
                    <div>
                        <h3 className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-1 sm:mb-1.5 md:mb-2 line-clamp-2`}>
                            {project.title}
                        </h3>
                        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 line-clamp-2 sm:line-clamp-3`}>
                            {project.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} text-xs sm:text-sm`}>
                            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                            <span>{project.year}</span>
                        </div>
                        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-purple-400 group-hover:text-purple-300" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;