import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import About1 from '../components/about_components/About1';
import About2 from '../components/about_components/About2';
import Team from '../components/about_components/Team';
import FAQ from '../components/about_components/FAQ';
import AboutSidebar from '../components/sidebar_components/AboutSidebar';
import StechBanner from '../components/home_components/StechBanner';
import Message from '../components/about_components/Message';
import CoreValues from '../components/about_components/CoreValues';
import WhyUs from '../components/home_components/WhyUs';

const About = () => {
 
  return (
    <>
      {/* <AboutSidebar /> */}
  
      <div id="about1">
        <About1  />
      </div>
     
      <div id="about2" >
        <About2  />
      </div>
      <div id ="values"> 
        <CoreValues /> 
      </div>
      <div id="message"  >
        {/* <Message  /> */}
      </div>
      <div id="team"  >
        {/* <Team  /> */}
      </div>
      <div id="why-us"  >
        {/* <WhyUs></WhyUs> */}
      </div>
      {/* <div id="faq" >
        <FAQ  />
      </div> */}
    </>
  );
};

export default About;
