import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Code, BookOpen } from 'lucide-react';
import NavButton from './NavButton.jsx';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const path = location.pathname.split('/')[1] || 'home';

    return (
        <header className="relative overflow-hidden bg-gradient-to-r bg-gray-800">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
            <div className="relative bg-gray-800 max-w-6xl mx-auto px-6 py-4">
                <nav className="flex items-center justify-between">
                    <button onClick={() => navigate('/')} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-0.5">
                            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                                <span className="text-lg font-bold text-white">DV</span>
                            </div>
                        </div>
                        <span className="text-xl font-bold text-white">Doan Viet</span>
                    </button>

                    <div className="flex items-center gap-6">
                        <NavButton
                            onClick={() => navigate('/')}
                            icon={Home}
                            text="Home"
                            isActive={path === 'home' || path === ''}
                        />
                        <NavButton
                            onClick={() => navigate('/projects')}
                            icon={Code}
                            text="Projects"
                            isActive={path === 'projects'}
                        />
                        <NavButton
                            onClick={() => navigate('/blog')}
                            icon={BookOpen}
                            text="Blog"
                            isActive={path === 'blog'}
                        />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;