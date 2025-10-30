import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Code, BookOpen, Sun, Moon, Github, Linkedin, Facebook } from 'lucide-react';
import NavButton from './NavButton.jsx';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Theme state
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    // Language state
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'vi';
    });

    const path = location.pathname.split('/')[1] || 'home';

    // Apply theme to document
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Save language to localStorage
    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'vi' ? 'en' : 'vi');
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
            {/* Profile Section */}
            <div className="p-8 text-center border-b border-gray-800">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 mb-4">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                        <img src={"me.jpg"} alt={"avatar"}/>
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Doan Quoc Viet</h1>
                <p className="text-gray-400 italic">Software Engineering student at PTIT</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6">
                <div className="space-y-2">
                    <NavButton
                        onClick={() => navigate('/')}
                        icon={Home}
                        text="HOME"
                        isActive={path === 'home' || path === ''}
                    />
                    <NavButton
                        onClick={() => navigate('/projects')}
                        icon={Code}
                        text="PROJECTS"
                        isActive={path === 'projects'}
                    />
                    <NavButton
                        onClick={() => navigate('/blogs')}
                        icon={BookOpen}
                        text="BLOGS"
                        isActive={path === 'blogs'}
                    />
                    <NavButton
                        onClick={() => navigate('/archives')}
                        icon={BookOpen}
                        text="ARCHIVES"
                        isActive={path === 'archives'}
                    />
                    <NavButton
                        onClick={() => navigate('/about')}
                        icon={BookOpen}
                        text="ABOUT"
                        isActive={path === 'about'}
                    />
                </div>
            </nav>

            {/* Social Links & Controls */}
            <div className="p-6 border-t border-gray-800">
                <div className="flex justify-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                    </button>

                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors text-sm font-semibold"
                        title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
                    >
                        {language === 'vi' ? 'EN' : 'VI'}
                    </button>

                    {/* GitHub */}
                    <a
                        href="https://github.com/vietunitydev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                        title="GitHub"
                    >
                        <Github size={15} />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/doanviet27204/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                        title="LinkedIn"
                    >
                        <Linkedin size={15} />
                    </a>

                    {/* Facebook */}
                    <a
                        href="https://facebook.com/doanviet.027"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                        title="Facebook"
                    >
                        <Facebook size={15} />
                    </a>
                </div>
            </div>
        </aside>
    );
};

export default Header;