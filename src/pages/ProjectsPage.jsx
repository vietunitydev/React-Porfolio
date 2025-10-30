import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';
import { projects } from '../data/projects';
import { useTheme } from '../components/context/ThemeContext.jsx';

const ProjectsPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen ${theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'}`}>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-6 sm:py-8 md:py-10">
                <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3 sm:mb-4 text-center`}>My Projects</h1>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm sm:text-base text-center mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4`}>
                    Here are some of the games and projects I've worked on. Each project showcases different
                    aspects of game development and technical challenges I've solved.
                </p>

                <div className="grid grid-cols-1 gap-6 sm:gap-8">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => navigate(`/projects/${project.id}`)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProjectsPage;