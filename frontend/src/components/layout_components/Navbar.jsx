import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const [navbarData, setNavbarData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const response = await fetch(`${apiUrl}/layout/navbar/`);
        const data = await response.json();
        setNavbarData(data);
      } catch (error) {
        console.error('Error fetching navbar data:', error);
      }
    };

    fetchNavbarData();

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (!navbarData) {
    return (
      <nav className="fixed w-full z-50 bg-[#f8f9fa] shadow-md">
        <div className="container mx-auto px-6 py-4">Loading...</div>
      </nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#f8f9fa] shadow-lg py-2' : 'bg-[#f8f9fa]/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <img
              src={navbarData.logo}
              alt="KAF TAR Logo"
              className="h-12 md:h-16 transition-all duration-300"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navbarData.links.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <a
                  href={link.href}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    link.name === 'Contact'
                      ? 'bg-[#7bbf42] text-white hover:bg-[#5a9e2a]'
                      : isActive(link.href)
                      ? 'bg-[#f9b414] text-[#040404]'
                      : 'text-[#040404] hover:text-[#70308c] hover:bg-[#f9b414]/10'
                  }`}
                >
                  {link.name}
                </a>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: navbarData.links.length * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={navbarData.ctaButton.href}
                className="ml-4 px-6 py-2 bg-gradient-to-r from-[#f9b414] to-[#7bbf42] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {navbarData.ctaButton.text}
              </a>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#040404] focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-4 pb-4"
          >
            <div className="flex flex-col space-y-3">
              {navbarData.links.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive(link.href)
                      ? 'bg-[#f9b414] text-[#040404]'
                      : link.name === 'Contact'
                      ? 'bg-[#7bbf42] text-white'
                      : 'text-[#040404]'
                  }`}
                  whileHover={{ 
                    x: 5,
                    backgroundColor: isActive(link.href) 
                      ? '#f9b414' 
                      : link.name === 'Contact'
                      ? '#7bbf42'
                      : '#f9b41410'
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href={navbarData.ctaButton.href}
                className="mt-2 px-6 py-3 bg-gradient-to-r from-[#f9b414] to-[#7bbf42] text-white font-bold rounded-lg shadow-md text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {navbarData.ctaButton.text}
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>

      {/* Animated Border Bottom */}
      <motion.div
        className="h-1 bg-gradient-to-r from-[#7bbf42] via-[#f9b414] to-[#70308c]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </motion.nav>
  );
};

export default Navbar;