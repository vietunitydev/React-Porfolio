import React from 'react';

const NavButton = ({ onClick, icon: Icon, text, isActive, theme = 'dark' }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                isActive
                    ? 'bg-purple-600 text-white'
                    : theme === 'dark'
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
        >
            <Icon size={15} />
            <span className="font-normal text-sm">{text}</span>
        </button>
    );
};

export default NavButton;