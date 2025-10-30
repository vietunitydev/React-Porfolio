import React from 'react';
import { Mail, Github, Linkedin, Facebook } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const ContactFooter = () => {
    const { theme } = useTheme();

    const socialLinks = [
        {
            name: 'Email',
            icon: Mail,
            url: 'mailto:doanquocviet02810@gmail.com',
            color: 'hover:text-purple-400',
            bgColor: 'hover:bg-purple-500/20',
            borderColor: 'hover:border-purple-500/50'
        },
        {
            name: 'GitHub',
            icon: Github,
            url: 'https://github.com/vietunitydev',
            color: 'hover:text-gray-300',
            bgColor: theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200',
            borderColor: theme === 'dark' ? 'hover:border-gray-600' : 'hover:border-gray-300'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: 'https://www.linkedin.com/in/doanviet27204/',
            color: 'hover:text-blue-400',
            bgColor: 'hover:bg-blue-500/20',
            borderColor: 'hover:border-blue-500/50'
        },
        {
            name: 'Facebook',
            icon: Facebook,
            url: 'https://facebook.com/doanviet027',
            color: 'hover:text-blue-500',
            bgColor: 'hover:bg-blue-600/20',
            borderColor: 'hover:border-blue-600/50'
        }
    ];

    return (
        <footer className={`${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-100/50'} backdrop-blur-sm border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
            {/* Contact Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="text-center">
                    <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3`}>
                        Connect <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">With Me</span>
                    </h2>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-xl mx-auto px-4`}>
                        Let's collaborate and create something amazing together
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} flex items-center justify-center transition-all duration-300 ${social.bgColor} border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'} ${social.borderColor} hover:scale-110 hover:shadow-lg`}
                                    title={social.name}
                                >
                                    <Icon className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} transition-colors ${social.color}`} />

                                    {/* Tooltip */}
                                    <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'} text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none`}>
                                        {social.name}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={`border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                    <div className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm`}>
                        © 2025 Doan Quoc Viet. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ContactFooter;