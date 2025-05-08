import React from 'react';
import { FaHome, FaInfoCircle, FaUserFriends, FaNewspaper, FaMapMarkerAlt, FaPhoneAlt, FaChartBar, FaGlobeAmericas, FaUserCog, FaTrophy, FaMedal, FaAward, FaTasks, FaClock, FaPlaneDeparture, FaIndustry, FaBuilding, FaHardHat, FaHandshake } from 'react-icons/fa';

const HomeSidebar = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-24 -right-20 h-full text-white w-64 z-20">
      <div className="flex flex-col items-center pt-8 space-y-6 pl-4">
        {/* Home */}
        <button
          onClick={() => scrollToSection('hero')}
          className="group flex items-center justify-center space-x-4 p-1 w-5 h-5 lg:w-[40px] lg:h-[40px] bg-[#e6b800] border border-gray-50 text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-white hover:font-bold hover:pr-20"
        >
          <FaHome className="text-xs lg:text-md transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Home</span>
        </button>

        {/* Countries */}
        <button
          onClick={() => scrollToSection('cards')}
          className="group flex items-center justify-center space-x-4 p-1 w-5 h-5 lg:w-[40px] lg:h-[40px] bg-[#e6b800] border border-gray-50 text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-white hover:font-bold hover:pr-20"
        >
          <FaGlobeAmericas className="text-xs lg:text-md transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Countries</span>
        </button>

        {/* Services */}
        <button
          onClick={() => scrollToSection('services')}
          className="group flex items-center justify-center space-x-4 p-1 w-5 h-5 lg:w-[40px] lg:h-[40px] bg-[#e6b800] border border-gray-50 text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-white hover:font-bold hover:pr-20"
        >
          <FaUserCog className="text-xs lg:text-md transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Services</span>
        </button>

        <button
          onClick={() => scrollToSection('statistics')}
          className="group flex items-center justify-center space-x-4 p-1 w-5 h-5 lg:w-[40px] lg:h-[40px] bg-[#e6b800] border border-gray-50 text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-white hover:font-bold hover:pr-20"
        >
          <FaAward className="text-xs lg:text-md transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Achievements</span>
        </button>

        <button
          onClick={() => scrollToSection('why-us')}
          className="group flex items-center justify-center space-x-4 p-1 w-5 h-5 lg:w-[40px] lg:h-[40px] bg-[#e6b800] border border-gray-50 text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-white hover:font-bold hover:pr-20"
        >
          <FaInfoCircle className="text-xs lg:text-md transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Why Us</span>
        </button>

        <button
          onClick={() => scrollToSection('timeline')}
          className="group flex items-center justify-center space-x-4 p-1 w-5 h-5 lg:w-[40px] lg:h-[40px] bg-[#e6b800] border border-gray-50 text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-white hover:font-bold hover:pr-20"
        >
          <FaPlaneDeparture className="text-xs lg:text-md transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Mobilization Timeline</span>
        </button>

        {/* Clients */}
        <button
          onClick={() => scrollToSection('our-clients')}
          className="group flex items-center justify-center space-x-4 p-1 w-5 h-5 lg:w-[40px] lg:h-[40px] bg-[#e6b800] border border-gray-50 text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-white hover:font-bold hover:pr-20"
        >
          <FaUserFriends className="text-xs lg:text-md transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Clients</span>
        </button>

        {/* Industries */}
        <button
          onClick={() => scrollToSection('news')}
          className="group flex items-center justify-center space-x-4 p-1 w-5 h-5 lg:w-[40px] lg:h-[40px] bg-[#e6b800] border border-gray-50 text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-white hover:font-bold hover:pr-20"
        >
          <FaHardHat className="text-xs lg:text-md transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Industries</span>
        </button>

        {/* Associates */}
        <button
          onClick={() => scrollToSection('associates')}
          className="group flex items-center justify-center space-x-4 p-1 w-5 h-5 lg:w-[40px] lg:h-[40px] bg-[#e6b800] border border-gray-50 text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-white hover:font-bold hover:pr-20"
        >
          <FaHandshake className="text-xs lg:text-md transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Associates</span>
        </button>

        {/* Location */}
        <button
          onClick={() => scrollToSection('location')}
          className="group flex items-center justify-center space-x-4 p-1 w-5 h-5 lg:w-[40px] lg:h-[40px] bg-[#e6b800] border border-gray-50 text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-white hover:font-bold hover:pr-20"
        >
          <FaMapMarkerAlt className="text-xs lg:text-md transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Location</span>
        </button>
      </div>
    </div>
  );
};

export default HomeSidebar;
