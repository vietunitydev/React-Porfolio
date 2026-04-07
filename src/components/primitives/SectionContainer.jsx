import React from 'react';

const WIDTH_CLASS = {
    narrow: 'max-w-4xl',
    content: 'max-w-5xl',
    wide: 'max-w-6xl',
    full: 'max-w-7xl'
};

const PADDING_CLASS = {
    default: 'px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-10 md:py-12',
    compact: 'px-4 sm:px-6 md:px-12 lg:px-20 py-6 sm:py-8 md:py-10'
};

const SectionContainer = ({
    as: Component = 'section',
    width = 'full',
    spacing = 'default',
    className = '',
    children,
    ...props
}) => {
    const widthClass = WIDTH_CLASS[width] || WIDTH_CLASS.full;
    const spacingClass = PADDING_CLASS[spacing] || PADDING_CLASS.default;

    return (
        <Component className={`${widthClass} mx-auto ${spacingClass} ${className}`.trim()} {...props}>
            {children}
        </Component>
    );
};

export default SectionContainer;
