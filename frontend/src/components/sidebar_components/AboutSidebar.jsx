import React from 'react';
import { FaInfoCircle, FaUsers, FaQuestionCircle, FaBuilding, FaAddressCard, FaLeaf } from 'react-icons/fa';

const AboutSidebar = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-64 -right-20 h-full text-white w-64 z-20">
      <div className="flex flex-col items-center pt-8 space-y-6 pl-4">
        {/* About Us */}
        <button
          onClick={() => scrollToSection('about1')}
          className="group flex items-center justify-center space-x-4 p-1 w-5 h-5 lg:w-16 lg:h-16 bg-[#e6b800] text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-white hover:pr-20 hover:py-10"
        >
          <FaBuilding className="text-xs lg:text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">About Us</span>
        </button>

        {/* <button
          onClick={() => scrollToSection('about2')}
          className="group flex items-center justify-center space-x-4 p-1 w-5 h-5 lg:w-16 lg:h-16 bg-[#e6b800] text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-white hover:pr-20 hover:py-10"
        >
          <FaInfoCircle className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Our Identity</span>
        </button> */}

        {/* <button
          onClick={() => scrollToSection('values')}
          className="group flex items-center justify-center space-x-4 p-1 w-5 h-5 lg:w-16 lg:h-16 bg-[#e6b800] text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-white hover:pr-20 hover:py-10"
        >
          <FaLeaf className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Core Values</span>
        </button> */}

        <button
          onClick={() => scrollToSection('message')}
          className="group flex items-center justify-center space-x-4 p-1 w-5 h-5 lg:w-16 lg:h-16 bg-[#e6b800] text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-white hover:pr-20 hover:py-10"
        >
          <FaAddressCard className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Chairman's Message</span>
        </button>

        {/* Our Team */}
        <button
          onClick={() => scrollToSection('team')}
          className="group flex items-center justify-center space-x-4 p-1 w-5 h-5 lg:w-16 lg:h-16 bg-[#e6b800] text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-white hover:pr-20 hover:py-10"
        >
          <FaUsers className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Our Team</span>
        </button>

        {/* FAQ */}
        <button
          onClick={() => scrollToSection('faq')}
          className="group flex items-center justify-center space-x-4 p-1 w-5 h-5 lg:w-16 lg:h-16 bg-[#e6b800] text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-white hover:pr-20 hover:py-10"
        >
          <FaQuestionCircle className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">FAQ</span>
        </button>
      </div>
    </div>
  );
};

export default AboutSidebar;
