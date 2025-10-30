import React, { useState } from 'react';
import Header from '../common/Header';
import { useTheme } from '../context/ThemeContext.jsx';
import { Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
    const { theme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'}`}>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`fixed top-4 left-4 z-50 lg:hidden ${theme === 'dark' ? ' text-white' : ' text-gray-900'} p-3 shadow-lg}`}
            >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Overlay for mobile */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Sidebar/Header */}
            <div className={`fixed top-0 left-0 h-full z-40 transition-transform duration-300 ${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0`}>
                <Header onNavigate={() => setIsMenuOpen(false)} />
            </div>

            {/* Main Content */}
            <main className="lg:ml-80 min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default Layout;