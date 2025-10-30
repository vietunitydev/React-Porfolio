import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';
import { projects } from '../data/projects';

const ProjectsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <section className="max-w-6xl mx-auto px-20 py-10">
                <h1 className="text-4xl font-bold text-white mb-4 text-center">My Projects</h1>
                <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
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