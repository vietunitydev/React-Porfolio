import React from 'react';
import { Code, Database, Wrench, Globe } from 'lucide-react';
import SectionContainer from '../primitives/SectionContainer.jsx';

const TechStack = () => {
    const techCategories = [
        {
            title: 'Programming Languages',
            icon: Code,
            skills: [
                { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
                { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
                { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
                { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' }
            ]
        },
        {
            title: 'Technologies & Frameworks',
            icon: Wrench,
            skills: [
                { name: 'Unity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
                { name: '.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
                { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' }
            ]
        },
        {
            title: 'Databases',
            icon: Database,
            skills: [
                { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
                { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
                { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' }
            ]
        },
        {
            title: 'Tools & Other',
            icon: Globe,
            skills: [
                { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
                { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
                { name: 'Jira', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
                { name: 'VSCode', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
                { name: 'JetBrains', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jetbrains/jetbrains-original.svg' },
            ]
        }
    ];

    return (
        <SectionContainer width="full" spacing="default">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold app-text-primary mb-4">
                    Tech Stack
                </h2>
            </div>

            {/* Tech Categories Table */}
            <div className="app-panel overflow-hidden mb-8 sm:mb-12 shadow-theme-sm">
                {techCategories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                        <div
                            key={index}
                            className={`grid grid-cols-1 gap-4 p-4 sm:p-6 ${index !== techCategories.length - 1 ? 'border-b app-border' : ''}`}
                        >
                            {/* Category Title */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 app-text-secondary" />
                                <h3 className="text-base sm:text-lg font-bold app-text-primary">
                                    {category.title}
                                </h3>
                            </div>

                            {/* Skills Icons */}
                            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 items-center">
                                {category.skills.map((skill, i) => (
                                    <div
                                        key={i}
                                        className="group relative"
                                        title={skill.name}
                                    >
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 app-card rounded-xl p-2 transition-all hover:scale-110 flex items-center justify-center shadow-md">
                                            <img
                                                src={skill.icon}
                                                alt={skill.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs app-text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </SectionContainer>
    );
};

export default TechStack;