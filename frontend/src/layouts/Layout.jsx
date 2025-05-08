import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout_components/Navbar';
import Footer from '../components/layout_components/Footer';
import LanguageSelector from '../components/LanguageSelector';
import StechBanner from '../components/home_components/StechBanner';



const Layout = () => {
  const colorIndexRef = useRef({ layerWave: 1, 
    triangle: 0,
    book:1,
    curve:1,
    arrow:1,
    split:1,
    tilt:1,
  }); // Ref to maintain color index for each shape

  

  return (
    <>
    
      <Navbar />
      {/* <LanguageSelector /> */}
      {/* <StechBanner /> */}

      <Outlet  />
 
      {/* <Location /> */}
      <Footer  />
      

    </>
  );
};

export default Layout;
