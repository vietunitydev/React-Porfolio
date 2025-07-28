import React from 'react';
import { Github, Mail, Linkedin } from 'lucide-react';

const Hero = ({ setCurrentPage }) => (
    <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
            <div className="mb-8 relative">
                <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="text-5xl font-bold text-white">DV</span>
                    </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-green-500 w-10 h-10 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                </div>
            </div>

            <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Doan Viet
            </h1>
            <h2 className="text-2xl text-gray-300 mb-4">Doan Quoc Viet</h2>
            <h3 className="text-xl text-purple-400 mb-8">Unity Game Developer</h3>

            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto mb-12">
                Passionate Unity Game Developer creating immersive and engaging gameplay experiences.
                I enjoy solving technical challenges and collaborating with teams to deliver polished,
                high-quality games that meet the highest standards of quality and player engagement.
            </p>

            <div className="flex items-center justify-center gap-6 mb-12">
                <a href="https://github.com/vietunitydev" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                    <Github className="w-5 h-5" />
                    GitHub
                </a>
                <a href="mailto:vietunitydev2222@gmail.com" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                    <Mail className="w-5 h-5" />
                    Email
                </a>
                <a href="https://www.linkedin.com/in/doanviet27204/" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                </a>
            </div>

            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={() => setCurrentPage('projects')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-xl text-lg font-semibold"
                >
                    View My Projects
                </button>
                <button
                    onClick={() => setCurrentPage('blog')}
                    className="border-2 border-purple-600 text-purple-400 px-8 py-4 rounded-full hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105 text-lg font-semibold"
                >
                    Read My Blog
                </button>
            </div>
        </div>
    </section>
);

export default Hero;