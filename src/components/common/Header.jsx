import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Code, BookOpen } from 'lucide-react';
import NavButton from './NavButton.jsx';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const path = location.pathname.split('/')[1] || 'home';

    return (
        <aside className="fixed left-0 top-0 h-screen w-65 bg-gray-900 border-r border-gray-800 flex flex-col">
            {/* Profile Section */}
            <div className="p-8 text-center border-b border-gray-800">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 mb-4">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                        {/*<span className="text-4xl font-bold text-white">DV</span>*/}
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

            {/* Social Links */}
            <div className="p-6 border-t border-gray-800">
                <div className="flex justify-center gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                        <span>☾</span>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                        <span>⚡</span>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                        <span>✉</span>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                        <span>in</span>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                        <span>f</span>
                    </a>
                </div>
            </div>
        </aside>
    );
};

export default Header;