import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const apiUrl = import.meta.env.VITE_API_URL;

const ProjectCard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${apiUrl}/project/project-card/`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.projects);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-center py-20">Loading projects...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-12 text-center text-[#040404]">
        Our <span className="text-[#7bbf42]">Featured</span> Projects
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-[#f9b414]"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#040404] to-transparent p-4">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: project.status === 'Completed' ? '#7bbf42' : '#f9b414',
                  color: project.status === 'Completed' ? 'white' : '#040404'
                }}
              >
                {project.status}
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-[#7bbf42] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-[#040404]">{project.location}</span>
              </div>
              
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-[#7bbf42] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[#040404]">Completed: {new Date(project.completionDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-[#7bbf42] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <span className="text-[#040404]">{project.squareFootage.toLocaleString()} sq ft</span>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-[#040404] mb-2">Key Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.features.map((feature, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-[#f9b414] bg-opacity-20 text-[#040404] rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500">Client: <span className="font-medium text-[#040404]">{project.client}</span></p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-[#7bbf42] text-white font-bold rounded-full shadow-lg hover:bg-[#6aa836] transition-colors"
        >
          View All Projects
        </motion.button>
      </div>
    </div>
  );
};

export default ProjectCard;