import React, { useState } from 'react';
import Contact from '../../pages/Contact'; // Adjust the import according to your folder structure
import Contact1Modal from './editor_modals/contact_modals/Contact1Modal';
import Contact2Modal from './editor_modals/contact_modals/Contact2Modal';

const ContactEditor = () => {
  const [isModalOpen1, setModalOpen1] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);

  return (
    <div className='flex gap-20 items-center justify-between p-20'>
      {/* Buttons Section */}
      <div className='flex flex-col gap-10'>
        <button className="btn btn-primary px-20" onClick={() => setModalOpen1(true)}>Contact 1</button>
        <button className="btn btn-primary" onClick={() => setModalOpen2(true)}>Contact 2</button>

        {/* Contact Modals */}
        <Contact1Modal isOpen={isModalOpen1} onClose={() => setModalOpen1(false)} />
        <Contact2Modal isOpen={isModalOpen2} onClose={() => setModalOpen2(false)} />
      </div>

      {/* Mockup Browser Section */}
      <div className="mockup-browser bg-white border-8 border-black p-2 h-[700px] overflow-y-scroll">
        <div>
          <div className="mockup-browser-toolbar m-10">
            <div className="input">https://sample-website.com</div>
          </div>
          <div className='overflow-scroll'>
            {/* Render child components via Outlet */}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactEditor;
