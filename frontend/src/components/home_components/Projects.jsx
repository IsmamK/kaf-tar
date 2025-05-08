import { useState, useEffect } from 'react';
import { FaExpand, FaCalendarAlt, FaMapMarkerAlt, FaHardHat } from 'react-icons/fa';

const apiUrl = import.meta.env.VITE_API_URL;

const ProjectPreview = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${apiUrl}/projects/`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const toggleExpand = (projectId) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#7bbf42]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
          {error}
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#7bbf42] opacity-10 rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#f9b414] opacity-10 rounded-full translate-x-32 translate-y-32"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with creative design */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <h2 className="text-5xl font-bold text-[#040404] mb-4 relative z-10">
              Our Featured Projects
            </h2>
            <div className="absolute bottom-0 left-0 w-full h-4 bg-[#f9b414] opacity-40 -z-0"></div>
          </div>
          <p className="text-xl text-[#040404] max-w-3xl mx-auto opacity-90 mt-4">
            Explore our <span className="font-semibold text-[#7bbf42]">successful constructions</span> that showcase our expertise and <span className="font-semibold text-[#f9b414]">quality craftsmanship</span>
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ${expandedProject === project.id ? 'md:col-span-2 lg:col-span-2' : 'hover:shadow-2xl hover:-translate-y-2'}`}
            >
              {/* Project image with overlay */}
              <div className="relative h-64 overflow-hidden group">
                <img 
                  src={project.mainImage} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040404cc] via-transparent to-transparent opacity-90"></div>
                
                {/* Project quick info */}
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="flex items-center text-sm text-white">
                      <FaCalendarAlt className="mr-1 text-[#f9b414]" />
                      {project.completionDate}
                    </span>
                    <span className="flex items-center text-sm text-white">
                      <FaMapMarkerAlt className="mr-1 text-[#f9b414]" />
                      {project.location}
                    </span>
                    <span className="flex items-center text-sm text-white">
                      <FaHardHat className="mr-1 text-[#f9b414]" />
                      {project.type}
                    </span>
                  </div>
                </div>
                
                {/* Expand button */}
                <button 
                  onClick={() => toggleExpand(project.id)}
                  className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-[#7bbf42] hover:text-white transition-colors"
                  aria-label="Expand project details"
                >
                  <FaExpand className={`transition-transform ${expandedProject === project.id ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {/* Project details - shown when expanded */}
              {expandedProject === project.id && (
                <div className="p-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <div>
                      <h4 className="text-lg font-semibold text-[#040404] mb-3 border-b border-[#7bbf42] pb-2">Project Details</h4>
                      <p className="text-gray-700 mb-4">{project.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Client:</span>
                          <span className="font-medium text-[#040404]">{project.client}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Size:</span>
                          <span className="font-medium text-[#040404]">{project.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium text-[#040404]">{project.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-[#040404] mb-3 border-b border-[#7bbf42] pb-2">Key Features</h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-[#7bbf42] rounded-full mt-2 mr-2"></span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Gallery preview */}
                  {project.gallery && project.gallery.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-[#040404] mb-3 border-b border-[#7bbf42] pb-2">Gallery</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {project.gallery.slice(0, 3).map((image, index) => (
                          <div key={index} className="aspect-square overflow-hidden rounded-lg">
                            <img 
                              src={image} 
                              alt={`${project.title} - ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform"
                            />
                          </div>
                        ))}
                        {project.gallery.length > 3 && (
                          <div className="aspect-square bg-[#f9b414] bg-opacity-20 rounded-lg flex items-center justify-center">
                            <span className="text-[#040404] font-medium">+{project.gallery.length - 3} more</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-4 justify-between items-center border-t border-gray-100 pt-4">
                    <div className="flex items-center space-x-2">
                      {project.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-[#7bbf42] bg-opacity-10 text-[#040404]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="px-6 py-2 bg-[#7bbf42] text-white font-medium rounded-lg hover:bg-[#6aa738] transition-colors shadow-md">
                      View Full Case Study
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-[#7bbf42] to-[#f9b414] p-1 rounded-full shadow-lg">
            <button className="px-8 py-3 bg-white text-[#040404] font-bold rounded-full hover:bg-opacity-90 transition-all">
              View All Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectPreview;