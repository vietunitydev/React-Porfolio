"use client";

import React from 'react';
import { Home, Code, BookOpen, Sun, Moon, Github, Linkedin, Facebook } from 'lucide-react';
import NavButton from './NavButton.jsx';
import Button from '../primitives/Button.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { usePathname, useRouter } from '../../i18n/navigation';
import { useTranslations } from 'next-intl';

const Header = ({ onNavigate }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme, language, setLanguage } = useTheme();
    const t = useTranslations();

    const path = pathname.split('/')[1] || 'home';

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const toggleLanguage = () => {
        const newLang = language === 'vi' ? 'en' : 'vi';
        setLanguage(newLang);
    };

    const handleNavigation = (path) => {
        router.push(path);
        if (onNavigate) {
            onNavigate(); // Close menu on mobile
        }
    };

    return (
        <aside className="h-full w-full app-sidebar flex flex-col">
            {/* Profile Section */}
            <div className="p-6 sm:p-8 text-center border-b app-border">
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full border-2 border-gray-400 p-1 mb-3 sm:mb-4">
                    <div className="w-full h-full rounded-full app-surface-muted flex items-center justify-center overflow-hidden">
                        <img src={"/images/me.jpg"} alt={"avatar"} className="w-full h-full object-cover"/>
                    </div>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold app-text-primary mb-2">{t('header.name')}</h1>
                <p className="app-text-secondary italic text-sm sm:text-base">{t('header.title')}</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 sm:p-6 overflow-y-auto">
                <div className="space-y-2">
                    <NavButton
                        onClick={() => handleNavigation('/')}
                        icon={Home}
                        text={t('header.home')}
                        isActive={path === 'home' || path === ''}
                    />
                    <NavButton
                        onClick={() => handleNavigation('/projects')}
                        icon={Code}
                        text={t('header.projects')}
                        isActive={path === 'projects'}
                    />
                    <NavButton
                        onClick={() => handleNavigation('/blogs')}
                        icon={BookOpen}
                        text={t('header.blogs')}
                        isActive={path === 'blogs'}
                    />
                    <NavButton
                        onClick={() => handleNavigation('/archives')}
                        icon={BookOpen}
                        text={t('header.archives')}
                        isActive={path === 'archives'}
                    />
                    <NavButton
                        onClick={() => handleNavigation('/about')}
                        icon={BookOpen}
                        text={t('header.about')}
                        isActive={path === 'about'}
                    />
                </div>
            </nav>

            {/* Social Links & Controls */}
            <div className="p-4 sm:p-6 border-t app-border">
                <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                    {/* Theme Toggle */}
                    <Button
                        onClick={toggleTheme}
                        variant="icon"
                        size="icon"
                        title={theme === 'dark' ? t('header.themeDark') : t('header.themeLight')}
                    >
                        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                    </Button>

                    {/* Language Toggle */}
                    <Button
                        onClick={toggleLanguage}
                        variant="icon"
                        size="icon"
                        className="text-sm font-semibold"
                        title={t('header.languageSwitch')}
                    >
                        {language === 'vi' ? 'VI' : 'EN'}
                    </Button>

                    {/* GitHub */}
                    <a
                        href="https://github.com/vietunitydev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="app-icon-btn"
                        title="GitHub"
                    >
                        <Github size={15} />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/doanviet27204/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="app-icon-btn"
                        title="LinkedIn"
                    >
                        <Linkedin size={15} />
                    </a>

                    {/* Facebook */}
                    <a
                        href="https://facebook.com/doanviet.027"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="app-icon-btn"
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