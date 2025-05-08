import React, { useState } from 'react';
import Cards from '../components/home_components/Cards';
import Services from '../components/home_components/Services';
import WhyUs from '../components/home_components/WhyUs';
import OurClients from '../components/home_components/OurClients';
import IndustriesWeServe from '../components/home_components/IndustriesWeServe';
import Statistics from '../components/home_components/Statistics';
import Hero from '../components/home_components/Hero';
import ContactCTA from '../components/home_components/Contact';


import Associates from '../components/home_components/Associates';
import Timeline from '../components/home_components/MobilizationTimeline';
import AboutPreview from '../components/home_components/AboutPreview';
import ProjectPreview from '../components/home_components/Projects';
import Testimonials from '../components/home_components/Testimonials';
import ClientLogos from '../components/home_components/ClientLogos';
import Contact from '../components/home_components/Contact';

const Home = () => {
  // const { getDivider, availableShapes } = useOutletContext(); // Fetch shapes dynamically
  // const [currentShape, setCurrentShape] = useState('None'); // Default shape

  // const handleShapeChange = (event) => {
  //   setCurrentShape(event.target.value); // Update shape based on selection
  // };

  
  return (
    <div
     style={{ 
      paddingTop: "80px", // This pushes content below navbar
      minHeight: `calc(100vh - ${'80px'})` // Adjusts height accordingly
    }}
    >
      {/* <HomeSidebar /> */}
        
      

 
      <div id="carousel">
        {/* <CarouselComponent /> */}
      </div>

      
      

      <div id="hero">
        <Hero />
      </div>
      <div>
        {/* <AboutPreview></AboutPreview> */}
      </div>
      <div id="services">
        <Services />
      </div>
      

      <div id="why-us">
        <WhyUs />
      </div>

      <div>
        <ClientLogos></ClientLogos>
      </div>

      <div id="stech-banner">
        {/* <StechBanner /> */}
      </div>
      <div id="cards">
        {/* <Cards /> */}
      </div>
      {/* <div>
        <ProjectPreview></ProjectPreview>
      </div>

      <div>
        <Testimonials></Testimonials>
      </div>
      <div id="our-clients">
        <OurClients />
      </div> */}
      {/* <div>
        <ContactCTA></ContactCTA>
      </div> */}
      

      <div id="statistics">
        {/* <Statistics /> */}
      </div>

      {/* <div id="grid-cards">
        <GridCards />
      </div> */}

      
      <div id="timeline">
      {/* <Timeline /> */}

    </div>

      

      
      <div id="news">
        {/* <IndustriesWeServe /> */}
      </div>

      {/* <div id="associates">
        <Associates />
      </div> */}

      <div id="contact">
        <Contact></Contact>
      </div>

      {/* <div id="location">
        <Location />
      </div> */}

      {/* <div id="featured-video">
        <FeaturedVideo />
      </div> */}
    </div>
  );
};

export default Home;
