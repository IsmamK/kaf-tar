import React, { useState } from 'react';
import Gallery from '../../pages/Gallery'; // Adjust the import according to your folder structure
import GalleryModal from './editor_modals/gallery_modal/GalleryModal';

const GalleryEditor = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className='flex gap-20 items-center justify-between p-20'>
      {/* Buttons Section */}
      <div className='flex flex-col gap-10'>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>Gallery</button>
        
        {/* Gallery Modal */}
        <GalleryModal
          isOpen={isModalOpen} 
          onClose={() => setModalOpen(false)} 
        />
      </div>

      {/* Mockup Browser Section */}
      <div className="mockup-browser bg-white border-8 border-black p-2 h-[700px] overflow-y-scroll">
        <div className=''>
          <div className="mockup-browser-toolbar m-10">
            <div className="input">https://sample-website.com</div>
          </div>
          <div className='overflow-scroll'>
            {/* Render child components via Outlet */}
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryEditor;
