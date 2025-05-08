import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiX, FiFilter } from "react-icons/fi";

const Gallery = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [gallery, setGallery] = useState({
    title: "Our Gallery",
    subtitle: "Stunning collection of images",
    bgColor: "#ffffff",
    textColor: "#1a1a1a",
    imageBgColor: "#f8f9fa",
    imageTextColor: "#1a1a1a",
    items: Array(12).fill({
      image: "",
      subtitle: "",
      title: "",
      description: "",
    }),
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/gallery`)
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to demo data if API fails
        setGallery({
          title: "Our Creative Gallery",
          subtitle: "Explore our stunning collection of work",
          bgColor: "#ffffff",
          textColor: "#1a1a1a",
          imageBgColor: "#f8f9fa",
          imageTextColor: "#1a1a1a",
          items: [
            {
              image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
              subtitle: "Nature",
              title: "Forest Landscape",
              description: "Beautiful forest scenery with sunlight filtering through trees"
            },
            {
              image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
              subtitle: "Mountains",
              title: "Alpine View",
              description: "Majestic mountain range with clear blue skies"
            },
            {
              image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
              subtitle: "Landscape",
              title: "Misty Morning",
              description: "Early morning fog over peaceful countryside"
            },
            {
              image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
              subtitle: "Lake",
              title: "Serene Waters",
              description: "Calm lake surrounded by autumn trees"
            },
            {
              image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
              subtitle: "Nature",
              title: "Rocky Beach",
              description: "Dramatic coastal landscape with rock formations"
            },
            {
              image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
              subtitle: "Forest",
              title: "Sunlit Path",
              description: "Sun rays breaking through dense forest canopy"
            }
          ]
        });
        setLoading(false);
      });
  }, [API_URL]);

  const filteredItems = filter === 'all' 
    ? gallery.items 
    : gallery.items.filter(item => item.subtitle.toLowerCase() === filter.toLowerCase());

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      transition: { duration: 0.3 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const navigateImage = (direction) => {
    const currentIndex = gallery.items.findIndex(item => item.image === selectedImage.image);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? gallery.items.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === gallery.items.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(gallery.items[newIndex]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-28 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: gallery.bgColor, color: gallery.textColor }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={titleVariants}
            className="text-4xl font-bold mb-4 text-green-800"
          >
            {gallery.title}
          </motion.h2>
          <motion.p 
            variants={titleVariants}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {gallery.subtitle}
          </motion.p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative inline-flex items-center bg-white rounded-full shadow-md overflow-hidden border border-green-200"
          >
            <FiFilter className="ml-3 text-green-600" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-transparent py-2 pl-2 pr-8 text-gray-700 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {[...new Set(gallery.items.map(item => item.subtitle))].map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <div className="absolute right-0 flex items-center justify-center h-full w-8 bg-green-500 pointer-events-none">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={index}
              variants={imageVariants}
              whileHover="hover"
              className="relative group overflow-hidden rounded-xl shadow-lg bg-white"
              style={{ backgroundColor: gallery.imageBgColor }}
              onClick={() => setSelectedImage(item)}
            >
              {item.image && (
                <>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <h3 className="text-white font-bold text-lg">{item.title}</h3>
                      <p className="text-green-200">{item.subtitle}</p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-lg transition-colors"
              >
                <FiX size={24} />
              </button>

              <div className="relative h-96">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full shadow-lg transition-colors"
                >
                  <FiChevronLeft size={32} />
                </button>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full shadow-lg transition-colors"
                >
                  <FiChevronRight size={32} />
                </button>
              </div>

              <div className="p-6" style={{ color: gallery.textColor }}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-green-800">{selectedImage.title}</h3>
                    <p className="text-yellow-600 font-medium">{selectedImage.subtitle}</p>
                  </div>
                </div>
                <p className="text-gray-700">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Gallery;