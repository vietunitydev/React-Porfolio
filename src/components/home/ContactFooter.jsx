import React from 'react';
import { Mail, Github, Linkedin, Facebook } from 'lucide-react';

const ContactFooter = () => {
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
            bgColor: 'hover:bg-gray-700',
            borderColor: 'hover:border-gray-600'
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
        <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
            {/* Contact Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Connect <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">With Me</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
                        Let's collaborate and create something amazing together
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center gap-6 flex-wrap">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative w-10 h-10 md:w-15 md:h-15 rounded-2xl bg-gray-800/50 flex items-center justify-center transition-all duration-300 ${social.bgColor} border border-gray-700/50 ${social.borderColor} hover:scale-110 hover:shadow-lg`}
                                    title={social.name}
                                >
                                    <Icon className={`w-4 h-4 md:w-5 md:h-5 text-gray-400 transition-colors ${social.color}`} />

                                    {/* Tooltip */}
                                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {social.name}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="text-center text-gray-400 text-sm">
                        © 2025 Doan Quoc Viet. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ContactFooter;