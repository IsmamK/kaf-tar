import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

const ContactModal = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [data, setData] = useState({
    title: "",
    subtitle: "",
    bgColor: "",
    textColor: "",
    divsBgColor: "",
    divsTextColor: "",
    card1: {
      icon: "",
      title: "",
      description: ""
    },
    card2: {
      icon: "",
      title: "",
      description: ""
    }
  });

  useEffect(() => {
    fetch(`${apiUrl}/home/contact/`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleCardChange = (card, field, value) => {
    setData({
      ...data,
      [card]: {
        ...data[card],
        [field]: value,
      },
    });
  };

  const handleColorChange = (colorField, value) => {
    setData({ ...data, [colorField]: value });
  };

  // Handle image link input
  const handleImageLinkChange = (card) => (event) => {
    const value = event.target.value;
    setData({
      ...data,
      [card]: {
        ...data[card],
        icon: value,
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/home/contact/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Data updated successfully");
        window.location.reload()
        onClose();
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-full max-w-lg relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>

        <h3 className="font-bold text-lg mb-4">Edit Contact Information</h3>

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
          <textarea
            value={data.subtitle}
            onChange={(e) => handleInputChange('subtitle', e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Subtitle"
          />
        </div>

        {/* Card 1 */}
        <div className="mb-4">
          <label className="block mb-1">Card 1 Icon (URL)</label>
          <input
            type="text"
            value={data.card1.icon}
            onChange={handleImageLinkChange('card1')}
            className="input input-bordered w-full"
            placeholder="Enter image URL"
          />
          {data.card1.icon && <img src={data.card1.icon} alt="Card 1 Icon" className="w-16 h-16 mt-2" />}
        </div>

        {/* Color Pickers */}
        <div className="mb-4">
          <label className="block mb-2">Background Color</label>
          <div className="hex flex items-center">
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
              placeholder="#ffffff"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Text Color</label>
          <div className="hex flex items-center">
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
              placeholder="#333333"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Divs Background Color</label>
          <div className="hex flex items-center">
            <HexColorPicker
              color={data.divsBgColor}
              onChange={(color) => handleColorChange('divsBgColor', color)}
              className="w-10 h-10"
            />
            <input
              type="text"
              value={data.divsBgColor}
              onChange={(e) => handleColorChange('divsBgColor', e.target.value)}
              className="input input-bordered w-20 ml-2"
              placeholder="#ffffff"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Divs Text Color</label>
          <div className="hex flex items-center">
            <HexColorPicker
              color={data.divsTextColor}
              onChange={(color) => handleColorChange('divsTextColor', color)}
              className="w-10 h-10"
            />
            <input
              type="text"
              value={data.divsTextColor}
              onChange={(e) => handleColorChange('divsTextColor', e.target.value)}
              className="input input-bordered w-20 ml-2"
              placeholder="#000000"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Card 1 Title</label>
          <input
            type="text"
            value={data.card1.title}
            onChange={(e) => handleCardChange('card1', 'title', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Card 1 Title"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Card 1 Description</label>
          <textarea
            value={data.card1.description}
            onChange={(e) => handleCardChange('card1', 'description', e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Card 1 Description"
          />
        </div>

        {/* Card 2 */}
        <div className="mb-4">
          <label className="block mb-1">Card 2 Icon (URL)</label>
          <input
            type="text"
            value={data.card2.icon}
            onChange={handleImageLinkChange('card2')}
            className="input input-bordered w-full"
            placeholder="Enter image URL"
          />
          {data.card2.icon && <img src={data.card2.icon} alt="Card 2 Icon" className="w-16 h-16 mt-2" />}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Card 2 Title</label>
          <input
            type="text"
            value={data.card2.title}
            onChange={(e) => handleCardChange('card2', 'title', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Card 2 Title"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Card 2 Description</label>
          <textarea
            value={data.card2.description}
            onChange={(e) => handleCardChange('card2', 'description', e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Card 2 Description"
          />
        </div>

        <button onClick={handleSubmit} className="btn btn-success text-white">Submit</button>
      </div>
    </dialog>
  );
};

export default ContactModal;
