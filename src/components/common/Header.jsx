import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Code, BookOpen, Sun, Moon, Github, Linkedin, Facebook } from 'lucide-react';
import NavButton from './NavButton.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import {useTranslation} from "react-i18next";

const Header = ({ onNavigate }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, setTheme, language, setLanguage } = useTheme();
    const { t } = useTranslation();

    const path = location.pathname.split('/')[1] || 'home';

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const toggleLanguage = () => {
        const newLang = language === 'vi' ? 'en' : 'vi';
        setLanguage(newLang);
    };

    const handleNavigation = (path) => {
        navigate(path);
        if (onNavigate) {
            onNavigate(); // Close menu on mobile
        }
    };

    return (
        <aside className={`h-full w-full ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-r flex flex-col shadow-xl`}>
            {/* Profile Section */}
            <div className={`p-6 sm:p-8 text-center border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 mb-3 sm:mb-4">
                    <div className={`w-full h-full rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center overflow-hidden`}>
                        <img src={"/images/me.jpg"} alt={"avatar"} className="w-full h-full object-cover"/>
                    </div>
                </div>
                <h1 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>{t('header.name')}</h1>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} italic text-sm sm:text-base`}>{t('header.title')}</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 sm:p-6 overflow-y-auto">
                <div className="space-y-2">
                    <NavButton
                        onClick={() => handleNavigation('/')}
                        icon={Home}
                        text={t('header.home')}
                        isActive={path === 'home' || path === ''}
                        theme={theme}
                    />
                    <NavButton
                        onClick={() => handleNavigation('/projects')}
                        icon={Code}
                        text={t('header.projects')}
                        isActive={path === 'projects'}
                        theme={theme}
                    />
                    <NavButton
                        onClick={() => handleNavigation('/blogs')}
                        icon={BookOpen}
                        text={t('header.blogs')}
                        isActive={path === 'blogs'}
                        theme={theme}
                    />
                    <NavButton
                        onClick={() => handleNavigation('/archives')}
                        icon={BookOpen}
                        text={t('header.archives')}
                        isActive={path === 'archives'}
                        theme={theme}
                    />
                    <NavButton
                        onClick={() => handleNavigation('/about')}
                        icon={BookOpen}
                        text={t('header.about')}
                        isActive={path === 'about'}
                        theme={theme}
                    />
                </div>
            </nav>

            {/* Social Links & Controls */}
            <div className={`p-4 sm:p-6 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} flex items-center justify-center hover:text-white transition-colors`}
                        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                    </button>

                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} flex items-center justify-center hover:text-white transition-colors text-sm font-semibold`}
                        title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
                    >
                        {language === 'vi' ? 'VI' : 'EN'}
                    </button>

                    {/* GitHub */}
                    <a
                        href="https://github.com/vietunitydev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} flex items-center justify-center hover:text-white transition-colors`}
                        title="GitHub"
                    >
                        <Github size={15} />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/doanviet27204/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} flex items-center justify-center hover:text-white transition-colors`}
                        title="LinkedIn"
                    >
                        <Linkedin size={15} />
                    </a>

                    {/* Facebook */}
                    <a
                        href="https://facebook.com/doanviet.027"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} flex items-center justify-center hover:text-white transition-colors`}
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