import React, { useState,useEffect} from 'react';
import { HexColorPicker } from 'react-colorful';

const LocationModal = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;


  const [data, setData] = useState({
    title: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    workingHours: "",
    mapSrc: "",
    bgColor: "", // Default background color
    textColor: "", // Default text color
  });

  useEffect(()=>{
    fetch(`${apiUrl}/home/location/`)
    .then(res=>res.json())
    .then(data=>setData(data))
  },[])

  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleColorChange = (colorField, value) => {
    setData({ ...data, [colorField]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/home/location/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        alert('Location section updated successfully!');
        window.location.reload()

      } else {
        alert('Failed to update location section.');
      }
    } catch (error) {
      console.error('Error updating location section:', error);
      alert('Error updating location section.');
    }
  }
  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-full max-w-lg relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
        
        <h3 className="font-bold text-lg mb-4">Edit Location Information</h3>

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
          <label className="block mb-1">Subtitle</label>
          <input
            type="text"
            value={data.subtitle}
            onChange={(e) => handleInputChange('subtitle', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Subtitle"
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
          <label className="block mb-1">Address</label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Address"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Phone</label>
          <input
            type="text"
            value={data.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Phone Number"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Email Address"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Working Hours</label>
          <input
            type="text"
            value={data.workingHours}
            onChange={(e) => handleInputChange('workingHours', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Working Hours"
          />
        </div>

        {/* Color Pickers */}
        <div className="mb-4">
          <label className="block mb-2">Background Color</label>
          <div className="flex items-center">
            <HexColorPicker
              color={data.bgColor}
              onChange={(color) => handleColorChange('bgColor', color)}
              className="w-10 h-10"
            />
            <input
              type="text"
              value={data.bgColor}
              onChange={(e) => handleColorChange('bgColor', e.target.value)}
              className="input input-bordered w-20 ml-2"
              placeholder="#f8f9fa"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Text Color</label>
          <div className="flex items-center">
            <HexColorPicker
              color={data.textColor}
              onChange={(color) => handleColorChange('textColor', color)}
              className="w-10 h-10"
            />
            <input
              type="text"
              value={data.textColor}
              onChange={(e) => handleColorChange('textColor', e.target.value)}
              className="input input-bordered w-20 ml-2"
              placeholder="#212529"
            />
          </div>
        </div>

        {/* Google Maps Embed */}
        <h4 className="font-bold text-lg mb-2">Map Location</h4>
        <input
          type="text"
          value={data.mapSrc}
          onChange={(e) => handleInputChange('mapSrc', e.target.value)}
          className="input input-bordered w-full mb-4"
          placeholder="Google Maps Embed URL"
        />
        <iframe
          src={data.mapSrc}
          width="100%"
          height="200"
          className="border-2 border-gray-300 mb-4"
          style={{ borderRadius: '8px' }}
          loading="lazy"
          title="Location Map"
        ></iframe>

        <button onClick={handleSubmit} className="btn btn-success">Submit</button>
      </div>
    </dialog>
  );
};

export default LocationModal;
