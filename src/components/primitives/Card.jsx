import React from 'react';

const Card = ({
    as: Component = 'div',
    hover = false,
    padding = 'md',
    className = '',
    children,
    ...props
}) => {
    const paddingClass = padding === 'none'
        ? ''
        : padding === 'lg'
            ? 'p-4 sm:p-6 md:p-8'
            : 'p-4 sm:p-5 md:p-6';

    return (
        <Component
            className={`app-card ${hover ? 'app-card-hover' : ''} ${paddingClass} ${className}`.trim()}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Card;
