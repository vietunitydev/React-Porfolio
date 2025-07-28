import React from 'react';
import { Home, Code, BookOpen } from 'lucide-react';

const Header = ({ currentPage, setCurrentPage }) => (
    <header className="relative overflow-hidden bg-gradient-to-r bg-gray-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative bg-gray-800 max-w-6xl mx-auto px-6 py-4">
            <nav className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                            <span className="text-lg font-bold text-white">DV</span>
                        </div>
                    </div>
                    <span className="text-xl font-bold text-white">Doan Viet</span>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setCurrentPage('home')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            currentPage === 'home'
                                ? 'bg-purple-600 text-white'
                                : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                        }`}
                    >
                        <Home className="w-4 h-4" />
                        Home
                    </button>
                    <button
                        onClick={() => setCurrentPage('projects')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            currentPage === 'projects'
                                ? 'bg-purple-600 text-white'
                                : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                        }`}
                    >
                        <Code className="w-4 h-4" />
                        Projects
                    </button>
                    <button
                        onClick={() => setCurrentPage('blog')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            currentPage === 'blog'
                                ? 'bg-purple-600 text-white'
                                : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                        }`}
                    >
                        <BookOpen className="w-4 h-4" />
                        Blog
                    </button>
                </div>
            </nav>
        </div>
    </header>
);

export default Header;