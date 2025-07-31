import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header.jsx';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import ProjectDetail from './components/projects/ProjectDetail.jsx';

const App = () => {
    return (
        <Router>
            <div className="font-sans">
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                    <Route path="/blog" element={<BlogPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;