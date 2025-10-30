import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import ProjectDetail from './components/projects/ProjectDetail.jsx';
import BlogDetail from './components/blogs/BlogDetail.jsx';
import {ThemeProvider} from "./components/context/ThemeContext.jsx";
import "./hook/i18n";

const App = () => {
    return (
        <ThemeProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/projects/:id" element={<ProjectDetail />} />
                        <Route path="/blogs" element={<BlogPage />} />
                        <Route path="/blogs/:slug" element={<BlogDetail />} />
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    );
};

export default App;