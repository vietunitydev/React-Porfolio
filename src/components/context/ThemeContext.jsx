"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../../i18n/navigation';

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const setLanguage = (lang) => {
        localStorage.setItem('language', lang);
        if (lang !== locale) {
            router.replace(pathname, { locale: lang });
        }
    };

    const value = {
        theme,
        setTheme,
        language: locale,
        setLanguage
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }

    return context;
};