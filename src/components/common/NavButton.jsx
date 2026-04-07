import React from 'react';

const NavButton = ({ onClick, icon: Icon, text, isActive }) => {
    return (
        <button
            onClick={onClick}
            className={isActive ? 'app-nav-btn-active' : 'app-nav-btn'}
        >
            <Icon size={15} />
            <span className="font-normal text-sm">{text}</span>
        </button>
    );
};

export default NavButton;