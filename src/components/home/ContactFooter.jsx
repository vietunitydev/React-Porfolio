import React from 'react';
import { Mail, Github, Linkedin, Facebook } from 'lucide-react';

const ContactFooter = () => {
    const socialLinks = [
        {
            name: 'Email',
            icon: Mail,
            url: 'mailto:doanquocviet02810@gmail.com'
        },
        {
            name: 'GitHub',
            icon: Github,
            url: 'https://github.com/vietunitydev'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: 'https://www.linkedin.com/in/doanviet27204/'
        },
        {
            name: 'Facebook',
            icon: Facebook,
            url: 'https://facebook.com/doanviet027'
        }
    ];

    return (
        <footer className="app-panel border-t-0 rounded-none">
            {/* Contact Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold app-text-primary mb-3">
                        Connect With Me
                    </h2>
                    <p className="app-text-secondary text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-xl mx-auto px-4">
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
                                    className="group relative app-icon-btn w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-2xl border app-border hover:scale-110 hover:shadow-lg"
                                    title={social.name}
                                >
                                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-colors" />

                                    {/* Tooltip */}
                                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 app-btn-primary text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        {social.name}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t app-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                    <div className="text-center app-text-secondary text-xs sm:text-sm">
                        © 2025 Doan Quoc Viet. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ContactFooter;