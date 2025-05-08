import React, { useEffect, useState } from 'react';
import Projects from '../../pages/Projects'; // Adjust the import according to your folder structure
import ProjectsModal from './editor_modals/projects_modals.jsx/ProjectsModal';

// Mock data for projects 
const mockProjects = [
  {
    id: 1,
    title: 'New trends in Tech',
    description: 'This is a section of some simple filler text, also known as placeholder text.',
    imageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600',
  },
  {
    id: 2,
    title: 'Working with legacy stacks',
    description: 'This is a section of some simple filler text, also known as placeholder text.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600',
  },
  {
    id: 3,
    title: '10 best smartphones for devs',
    description: 'This is a section of some simple filler text, also known as placeholder text.',
    imageUrl: 'https://images.unsplash.com/photo-1542759564-7ccbb6ac450a?auto=format&q=75&fit=crop&w=600',
  },
  {
    id: 4,
    title: '8 High performance Notebooks',
    description: 'This is a section of some simple filler text, also known as placeholder text.',
    imageUrl: 'https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=600',
  },
];

const ProjectsEditor = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setProjects(mockProjects);  // Call the API here
  }, []);

  return (
    <div className='flex gap-20 items-center justify-between p-20'>
      <div className='flex flex-col gap-10'>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>Projects</button>
        
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>ProjectsCard</button>
        {/* Projects Modal */}
        <ProjectsModal
          isOpen={isModalOpen} 
          onClose={() => setModalOpen(false)} 
          projects={projects} 
          setProjects={setProjects} 
        />
      </div>

      {/* Mockup Browser Section */}
      <div className="mockup-browser bg-white border-8 border-black p-2 h-[700px] overflow-y-scroll">
        <div className=''>
          <div className="mockup-browser-toolbar m-10">
            <div className="input">https://sample-website.com</div>
          </div>
          <div className='overflow-scroll'>
            {/* Pass the projects data to the Projects component */}
            <Projects />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsEditor;
