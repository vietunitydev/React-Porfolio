import React from 'react';
import { Target, Trophy, Briefcase, GraduationCap } from 'lucide-react';

const AboutMe = () => {
    const experiences = [
        {
            role: 'Junior Unity Developer',
            company: 'KIM Software Solutions',
            period: '04/2025 - 08/2025',
            icon: Briefcase,
            color: 'text-purple-400'
        },
        {
            role: 'Fresher Unity Developer',
            company: 'KIM Software Solutions',
            period: '01/2024 - 03/2025',
            icon: Briefcase,
            color: 'text-blue-400'
        },
        {
            role: 'Intern',
            company: 'KIM Software Solutions',
            period: '09/2023 - 12/2023',
            icon: GraduationCap,
            color: 'text-cyan-400'
        }
    ];

    const achievements = [
        'Worked on 20+ team projects with distributed teams',
        'Optimized AI algorithms for chess game performance',
        'Built multiplayer systems using Photon Quantum',
        'Deployed games on WebGL, Android, and iOS platforms',
        'Integrated third-party services (Ads, Firebase, PlayFab)',
        'Applied Agile methodology for project management'
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    About <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    My journey from student to professional game developer
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left Column - Avatar & Info */}
                <div className="space-y-8">
                    {/* Avatar Card */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 p-1 shadow-2xl">
                                <div className="w-full h-full rounded-2xl bg-gray-800 flex items-center justify-center">
                                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                        DQV
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Doan Quoc Viet</h3>
                                <p className="text-purple-400 font-semibold mb-1">Unity Developer</p>
                                <p className="text-gray-400 text-sm">Ha Noi</p>
                            </div>
                        </div>

                        <div className="space-y-4 text-gray-300">
                            <p className="leading-relaxed">
                                Fourth-year Information Technology student at PTIT with a strong passion for game development.
                                With 2 years of hands-on experience in Unity Engine, I've contributed to multiple commercial projects
                                ranging from indie games to large-scale team productions.
                            </p>
                            <p className="leading-relaxed">
                                I thrive on solving complex technical challenges and collaborating with cross-functional teams
                                to deliver polished, high-quality gaming experiences that engage players.
                            </p>
                        </div>
                    </div>

                    {/* Career Goal */}
                    <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">Career Goal</h4>
                                <p className="text-gray-300 leading-relaxed">
                                    Aiming to become a <span className="text-cyan-400 font-semibold">Senior Fullstack Game Developer</span> within
                                    the next four years, combining deep Unity expertise with robust backend development skills.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Experience & Achievements */}
                <div className="space-y-8">
                    {/* Work Experience */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                        <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <Briefcase className="w-6 h-6 text-purple-400" />
                            Work Experience
                        </h4>
                        <div className="space-y-6">
                            {experiences.map((exp, index) => {
                                const Icon = exp.icon;
                                return (
                                    <div key={index} className="relative pl-8 border-l-2 border-gray-700 last:border-transparent">
                                        <div className={`absolute -left-3 w-6 h-6 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center ${exp.color}`}>
                                            <Icon className="w-3 h-3" />
                                        </div>
                                        <div>
                                            <h5 className="text-lg font-bold text-white">{exp.role}</h5>
                                            <p className="text-purple-400 text-sm font-semibold">{exp.company}</p>
                                            <p className="text-gray-500 text-sm">{exp.period}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Key Achievements */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                        <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <Trophy className="w-6 h-6 text-cyan-400" />
                            Key Achievements
                        </h4>
                        <ul className="space-y-3">
                            {achievements.map((achievement, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-300">
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 mt-2 flex-shrink-0"></div>
                                    <span>{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Education */}
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">Education</h4>
                                <p className="text-blue-400 font-semibold">Information Technology</p>
                                <p className="text-gray-300">Posts and Telecommunications Institute of Technology (PTIT)</p>
                                <p className="text-gray-500 text-sm mt-1">2022 - Present • Fourth-year student</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;