"use client";

import React from 'react';
import { useRouter } from '../i18n/navigation';
import ProjectCard from '../components/projects/ProjectCard';
import SectionContainer from '../components/primitives/SectionContainer.jsx';
import { getProjectSortTimestamp } from '../lib/project-date';

/**
 * @param {{
 *   projects?: Array<any>
 * }} props
 */
const ProjectsPage = ({ projects = [] }) => {
    const router = useRouter();
    const sortedProjects = React.useMemo(() => {
        return [...projects].sort((a, b) => {
            const aTime = getProjectSortTimestamp(a?.year || '');
            const bTime = getProjectSortTimestamp(b?.year || '');

            if (aTime === bTime) {
                return Number(b?.id || 0) - Number(a?.id || 0);
            }

            if (aTime === Number.NEGATIVE_INFINITY) {
                return 1;
            }

            if (bTime === Number.NEGATIVE_INFINITY) {
                return -1;
            }

            return bTime - aTime;
        });
    }, [projects]);

    return (
        <div className="app-page">
            <SectionContainer width="wide" spacing="compact">
                <h1 className="app-section-title">My Projects</h1>
                <p className="app-section-description max-w-2xl">
                    Here are some of the games and projects I've worked on. Each project showcases different
                    aspects of game development and technical challenges I've solved.
                </p>

                <div className="grid grid-cols-1 gap-6 sm:gap-8">
                    {sortedProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => router.push(`/projects/${project.id}`)}
                        />
                    ))}
                </div>
            </SectionContainer>
        </div>
    );
};

export default ProjectsPage;