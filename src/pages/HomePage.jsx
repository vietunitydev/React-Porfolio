import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ProjectHighlights from '../components/home/ProjectHighlights';
import BlogPreview from '../components/home/BlogPreview';
import AboutMe from '../components/home/AboutMe';
import TechStack from '../components/home/TechStack';
import ContactFooter from '../components/home/ContactFooter';

const HomePage = () => {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <HeroSection />
            <ProjectHighlights />
            <BlogPreview />
            {/*<AboutMe />*/}
            <TechStack />
            <ContactFooter />
        </div>
    );
};

export default HomePage;