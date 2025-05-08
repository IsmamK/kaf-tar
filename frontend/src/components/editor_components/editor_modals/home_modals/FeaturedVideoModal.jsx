import React, { useState,useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

const FeaturedVideoModal = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  


  const [data, setData] = useState({
    "title": "",
    "description": "",
    "button1": {
      "text": "",
      "link": ""
    },
    "button2": {
      "text": "e",
      "link": ""
    },
    "videoSrc": "",
    "colors": {
      "bgColor": "",
      "textColor": ""
    }
  });

  useEffect(()=>{
    fetch(`${apiUrl}/home/featured-video/`)
    .then(res=>res.json())
    .then(data=>setData(data))
  },[])
  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleButtonChange = (button, field, value) => {
    setData({
      ...data,
      [button]: {
        ...data[button],
        [field]: value,
      },
    });
  };

  const handleColorChange = (colorField, value) => {
    setData({ ...data, colors: { ...data.colors, [colorField]: value } });
  };


  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/home/featured-video/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        alert('Featured Video updated successfully!');
        window.location.reload()
      } else {
        alert('Failed to update featured video.');
      }
    } catch (error) {
      console.error('Error updating news:', error);
      alert('Error updating news.');
    }
  }

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-full max-w-lg relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
        
        <h3 className="font-bold text-lg mb-4">Edit Featured Video Information</h3>

        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Title"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            value={data.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Description"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Button 1 Text</label>
          <input
            type="text"
            value={data.button1.text}
            onChange={(e) => handleButtonChange('button1', 'text', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Button 1 Text"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Button 1 Link</label>
          <input
            type="text"
            value={data.button1.link}
            onChange={(e) => handleButtonChange('button1', 'link', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Button 1 Link"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Button 2 Text</label>
          <input
            type="text"
            value={data.button2.text}
            onChange={(e) => handleButtonChange('button2', 'text', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Button 2 Text"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Button 2 Link</label>
          <input
            type="text"
            value={data.button2.link}
            onChange={(e) => handleButtonChange('button2', 'link', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Button 2 Link"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Video Source</label>
          <input
            type="text"
            value={data.videoSrc}
            onChange={(e) => handleInputChange('videoSrc', e.target.value)}
            className="input input-bordered w-full"
            placeholder="YouTube Video Embed URL"
          />
        </div>

        {/* Color Pickers */}
        <div className="mb-4">
          <label className="block mb-2">Background Color</label>
          <div className="flex items-center">
            <HexColorPicker
              color={data.colors.bgColor}
              onChange={(color) => handleColorChange('bgColor', color)}
              className="w-10 h-10"
            />
            <input
              type="text"
              value={data.colors.bgColor}
              onChange={(e) => handleColorChange('bgColor', e.target.value)}
              className="input input-bordered w-20 ml-2"
              placeholder="#ffffff"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Text Color</label>
          <div className="flex items-center">
            <HexColorPicker
              color={data.colors.textColor}
              onChange={(color) => handleColorChange('textColor', color)}
              className="w-10 h-10"
            />
            <input
              type="text"
              value={data.colors.textColor}
              onChange={(e) => handleColorChange('textColor', e.target.value)}
              className="input input-bordered w-20 ml-2"
              placeholder="#333333"
            />
          </div>
        </div>

        {/* Video Preview */}
        <h4 className="font-bold text-lg mb-2">Video Preview</h4>
        <iframe
          src={data.videoSrc}
          width="100%"
          height="200"
          className="border-2 border-gray-300 mb-4"
          style={{ borderRadius: '8px' }}
          loading="lazy"
          title="Featured Video"
        ></iframe>

        <button onClick={handleSubmit} className="btn btn-success">Submit</button>
      </div>
    </dialog>
  );
};

export default FeaturedVideoModal;
