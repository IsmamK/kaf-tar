import React, { useState } from 'react';
import About from '../../pages/About';
import About1Modal from './editor_modals/about_modals/About1Modal';
import About2Modal from './editor_modals/about_modals/About2Modal';
import TeamModal from './editor_modals/about_modals/TeamModal';
import FAQModal from './editor_modals/about_modals/FAQModal';
import MessageModal from './editor_modals/about_modals/MessageModal';
import CoreValuesModal from './editor_modals/about_modals/CoreValuesModal';
import WhyUsModal from './editor_modals/home_modals/WhyUsModal';


const AboutEditor = () => {
  const [isAbout1Open, setAbout1Open] = useState(false);
  const [isAbout2Open, setAbout2Open] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [isTeamOpen, setTeamOpen] = useState(false);
  const [isFAQOpen, setFAQOpen] = useState(false);
  const [isWhyUsOpen, setWhyUsOpen] = useState(false);


  return (
    <div className='flex gap-20 items-center justify-between p-20'>
      {/* Buttons Section */}
      <div className='flex flex-col gap-10'>
        <button className="btn btn-primary" onClick={() => setAbout1Open(true)}>About 1</button>
        <button className="btn btn-primary" onClick={() => setAbout2Open(true)}>About 2</button>
        {/* <button className="btn btn-primary" onClick={() => setFAQOpen(true)}>Core Values</button> */}

        <button className="btn btn-primary" onClick={() => setMessageOpen(true)}>Message</button>

        <button className="btn btn-primary" onClick={() => setTeamOpen(true)}>Team</button>
        <button className="btn btn-primary" onClick={() => setWhyUsOpen(true)}>Why Us</button>
      </div>

      {/* Mockup Browser Section */}
      <div className="mockup-browser bg-white border-8 border-black p-2 h-[700px] overflow-y-scroll">
        <div className='bg-base-300'>
          <div className="mockup-browser-toolbar m-10">
            <div className="input">https://sample-website.com</div>
          </div>
          <div className='overflow-scroll'>
            <About />
          </div>
        </div>
      </div>

      {/* Modal Components */}
      <About1Modal isOpen={isAbout1Open} onClose={() => setAbout1Open(false)} />
      <About2Modal isOpen={isAbout2Open} onClose={() => setAbout2Open(false)} />
      <MessageModal isOpen={messageOpen} onClose={() => setMessageOpen(false)} />
      <TeamModal isOpen={isTeamOpen} onClose={() => setTeamOpen(false)} />
      {/* <CoreValuesModal isOpen={isFAQOpen} onClose={() => setFAQOpen(false)} /> */}
      <WhyUsModal isOpen={isWhyUsOpen} onClose={() => setWhyUsOpen(false)}></WhyUsModal>
    </div>
  );
}

export default AboutEditor;
