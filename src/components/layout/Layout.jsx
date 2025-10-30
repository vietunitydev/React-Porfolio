import React from 'react';
import Header from '../common/Header';
import { useTheme } from '../context/ThemeContext.jsx';

const Layout = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'}`}>
            <Header />

            <main className="ml-80 min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default Layout;