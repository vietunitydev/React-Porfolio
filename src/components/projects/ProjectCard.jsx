import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { formatProjectMonthYear } from '../../lib/project-date';

const ProjectCard = ({ project, onClick }) => {
    const displayDate = formatProjectMonthYear(project.year);
    const thumbnail =
        project.screenshots?.[0] ||
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"%3E%3Crect width="400" height="240" fill="%23d1d5db"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-family="Arial" font-size="18"%3ENo Image%3C/text%3E%3C/svg%3E';

    return (
        <div
            className="app-card app-card-hover overflow-hidden cursor-pointer group"
            onClick={onClick}
        >
            <div className="flex h-32 sm:h-40 md:h-48">
                {/* Image */}
                <div className="relative overflow-hidden w-32 sm:w-48 md:w-64 flex-shrink-0 bg-gray-400">
                    <img
                        src={thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 app-badge px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 text-xs sm:text-sm">
                        {displayDate}
                    </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col justify-between min-w-0">
                    <div>
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold app-text-primary mb-1 sm:mb-1.5 md:mb-2 line-clamp-2">
                            {project.title}
                        </h3>
                        <p className="app-text-secondary text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 line-clamp-2 sm:line-clamp-3">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 app-text-muted text-xs sm:text-sm">
                            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                            <span>{displayDate}</span>
                        </div>
                        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-200" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;