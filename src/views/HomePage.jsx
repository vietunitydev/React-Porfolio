"use client";

import React from 'react';
import ProjectHighlights from '../components/home/ProjectHighlights';
import BlogPreview from '../components/home/BlogPreview';
import TechStack from '../components/home/TechStack';
import ContactFooter from '../components/home/ContactFooter';

/**
 * @param {{
 *   projects?: Array<any>,
 *   blogs?: Array<any>
 * }} props
 */
const HomePage = ({ projects = [], blogs = [] }) => {
    return (
        <div className="app-page">
            <ProjectHighlights projects={projects} />
            <BlogPreview blogPosts={blogs} />
            <TechStack />
            <ContactFooter />
        </div>
    );
};

export default HomePage;