import { Icon } from 'lucide-react';

const NavButton = ({ onClick, icon: Icon, text, isActive }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
            }`}
        >
            <Icon className="w-4 h-4" />
            {text}
        </button>
    );
};

export default NavButton;
