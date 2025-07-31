import React from 'react';
import Hero from "../components/home/Hero.jsx";
import Skills from "../components/home/Skills.jsx";

const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Hero />
        <Skills />
    </div>
);

export default HomePage;