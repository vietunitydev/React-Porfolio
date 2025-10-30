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
            <section className="max-w-6xl mx-auto px-20 py-10">
                <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 text-center`}>My Projects</h1>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-center mb-12 max-w-2xl mx-auto`}>
                    Here are some of the games and projects I've worked on. Each project showcases different
                    aspects of game development and technical challenges I've solved.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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