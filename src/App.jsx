import React, { useState } from 'react';
import Header from './components/common/Header.jsx';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import ProjectDetail from './components/projects/ProjectDetail';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedProject, setSelectedProject] = useState(null);

    const renderPage = () => {
        if (selectedProject) {
            return (
                <ProjectDetail
                    project={selectedProject}
                    onBack={() => setSelectedProject(null)}
                />
            );
        }

        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'projects':
                return <ProjectsPage setSelectedProject={setSelectedProject} />;
            case 'blog':
                return <BlogPage />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="font-sans">
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
            {renderPage()}
        </div>
    );
};

export default App;