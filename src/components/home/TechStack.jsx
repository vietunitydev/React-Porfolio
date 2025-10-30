import React from 'react';
import { Code, Database, Wrench, Globe, Award, Zap } from 'lucide-react';

const TechStack = () => {
    const techCategories = [
        {
            title: 'Programming Languages',
            icon: Code,
            color: 'from-purple-500 to-pink-500',
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
            color: 'from-blue-500 to-cyan-500',
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
            color: 'from-cyan-500 to-teal-500',
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
            color: 'from-teal-500 to-green-500',
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
        <section className="max-w-7xl mx-auto px-20 py-10 bg-gray-900">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Tech <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Stack</span>
                </h2>
            </div>

            {/* Tech Categories Table */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden mb-12">
                {techCategories.map((category, index) => {
                    return (
                        <div
                            key={index}
                            className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-6 ${index !== techCategories.length - 1 ? 'border-b border-gray-700/50' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-bold text-white">{category.title}</h3>
                            </div>

                            {/* Right: Skills Icons */}
                            <div className="md:col-span-2 flex flex-wrap gap-6 items-center">
                                {category.skills.map((skill, i) => (
                                    <div
                                        key={i}
                                        className="group relative"
                                        title={skill.name}
                                    >
                                        <div className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-xl p-2 border border-gray-700/50 hover:border-gray-600 transition-all hover:scale-110 flex items-center justify-center">
                                            <img
                                                src={skill.icon}
                                                alt={skill.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default TechStack;