import React from 'react';

const SIZE_STYLES = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
    icon: 'h-10 w-10 p-0'
};

const VARIANT_STYLES = {
    primary: 'app-btn-primary',
    secondary: 'app-btn-secondary',
    ghost: 'app-text-secondary hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg',
    icon: 'app-icon-btn'
};

const Button = ({
    type = 'button',
    variant = 'secondary',
    size = 'md',
    className = '',
    children,
    ...props
}) => {
    const sizeClass = SIZE_STYLES[size] || SIZE_STYLES.md;
    const variantClass = VARIANT_STYLES[variant] || VARIANT_STYLES.secondary;

    return (
        <button
            type={type}
            className={`${variantClass} ${sizeClass} ${className}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
