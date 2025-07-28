import React from 'react';
import { Gamepad2, Code, Users } from 'lucide-react';

const Skills = () => (
    <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Technical Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <Gamepad2 className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Game Development</h3>
                <ul className="space-y-2 text-gray-300">
                    <li>• Unity Engine</li>
                    <li>• C# Programming</li>
                    <li>• Game Design Patterns</li>
                    <li>• Performance Optimization</li>
                </ul>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <Code className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Programming</h3>
                <ul className="space-y-2 text-gray-300">
                    <li>• Object-Oriented Programming</li>
                    <li>• Algorithm & Data Structures</li>
                    <li>• Version Control (Git)</li>
                    <li>• Debugging & Testing</li>
                </ul>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <Users className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Collaboration</h3>
                <ul className="space-y-2 text-gray-300">
                    <li>• Team Leadership</li>
                    <li>• Agile Methodology</li>
                    <li>• Code Review</li>
                    <li>• Technical Documentation</li>
                </ul>
            </div>
        </div>
    </section>
);

export default Skills;