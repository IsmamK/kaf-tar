import React, { useState } from 'react';
import Navbar from '../layout_components/Navbar';
import Footer from '../layout_components/Footer';
import EditNavbarModal from './editor_modals/layout_modals/EditNavbarModal';
import EditFooterModal from './editor_modals/layout_modals/EditFooterModal';

const LayoutsEditor = () => {
  const [isNavbarModalOpen, setNavbarModalOpen] = useState(false);
  const [isFooterModalOpen, setFooterModalOpen] = useState(false);

  const [navbarData, setNavbarData] = useState({ title: 'Default Navbar', link: '/home' });
  const [footerData, setFooterData] = useState({ text: 'Default Footer Text' });

  return (
    <div className="flex gap-20 items-center justify-between p-10">
      {/* Buttons Section */}
      <div className="flex flex-col gap-10">
        <button className="btn btn-primary px-20" onClick={() => setNavbarModalOpen(true)}>Edit Navbar</button>
        <button className="btn btn-primary px-20" onClick={() => setFooterModalOpen(true)}>Edit Footer</button>
      </div>

      {/* Mockup Browser Section */}
      <div className="bg-gray-200 rounded shadow-lg">
        <div className="mockup-browser-toolbar mb-4 p-3 bg-gray-300 rounded-t-lg flex items-center justify-center">
          <div className="text-gray-500">https://sample-website.com</div>
        </div>

        {/* Render Navbar and Footer */}
        <div className="p-5 space-y-10">
          <div className="border-b-2 pb-4">
            <Navbar title={navbarData.title} link={navbarData.link} />
          </div>

          <div className="pt-4 border-t-2">
            <Footer text={footerData.text} />
          </div>
        </div>
      </div>

      {/* Modals for Editing */}
      <EditNavbarModal
        isOpen={isNavbarModalOpen}
        onClose={() => setNavbarModalOpen(false)}
        navbarData={navbarData}
        setNavbarData={setNavbarData}
        apiUrl={import.meta.env.VITE_API_URL}  // Pass API URL for fetching data
      />

      <EditFooterModal
        isOpen={isFooterModalOpen}
        onClose={() => setFooterModalOpen(false)}
        footerData={footerData}
        setFooterData={setFooterData}
      />
    </div>
  );
};

export default LayoutsEditor;
