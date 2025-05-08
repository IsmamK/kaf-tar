import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

const GridCardsModal = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [data, setData] = useState({
    title: '',
    subtitle: '',
    bgColor: '',
    textColor: '',
    gridCards: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/grid-cards`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addNewCard = () => {
    const newCard = {
      image: '',
      title: '',
      description: '',
      flipBgColor: '#ffffff',
      flipTextColor: '#333333',
    };
    setData({ ...data, gridCards: [...data.gridCards, newCard] });
  };

  const removeCard = (index) => {
    const updatedCards = data.gridCards.filter((_, i) => i !== index);
    setData({ ...data, gridCards: updatedCards });
  };

  const handleInputChange = (index, field, value) => {
    const updatedCards = [...data.gridCards];
    updatedCards[index][field] = value;
    setData({ ...data, gridCards: updatedCards });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/home/grid-cards/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send `data` with image URLs
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      const result = await response.json();
      alert('Changes saved successfully:', result);
      window.location.reload();
      onClose();
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-full max-w-7xl relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>

        <label className="mr-2 font-bold">Title</label>
        <h3 className="text-lg mb-2">
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="input input-bordered"
            placeholder="Enter Title"
          />
        </h3>

        <label className="mr-2 font-bold">Subtitle</label>
        <p className="mb-4">
          <input
            type="text"
            value={data.subtitle}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            className="input input-bordered"
            placeholder="Enter Subtitle"
          />
        </p>

        <label className="mr-2">Background Color:</label>
        <div className="hex flex items-center mb-4">
          <HexColorPicker
            color={data.bgColor}
            onChange={(color) => setData({ ...data, bgColor: color })}
            className="w-12 h-12"
          />
          <input
            type="text"
            value={data.bgColor}
            onChange={(e) => setData({ ...data, bgColor: e.target.value })}
            className="input input-bordered w-20 ml-2"
            placeholder="#000000"
          />
        </div>

        <label className="mr-2">Text Color:</label>
        <div className="hex flex items-center mb-4">
          <HexColorPicker
            color={data.textColor}
            onChange={(color) => setData({ ...data, textColor: color })}
            className="w-12 h-12"
          />
          <input
            type="text"
            value={data.textColor}
            onChange={(e) => setData({ ...data, textColor: e.target.value })}
            className="input input-bordered w-20 ml-2"
            placeholder="#ffffff"
          />
        </div>

        <table className="table">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-2 border">Image URL</th>
              <th className="px-2 py-2 border">Title</th>
              <th className="px-2 py-2 border">Description</th>
              <th className="px-2 py-2 border">Background Color</th>
              <th className="px-2 py-2 border">Text Color</th>
              <th className="px-2 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.gridCards.map((card, index) => (
              <tr key={index} className="border-t">
                <td className="px-1 py-1 border">
                  <div className="flex flex-col items-center">
                    {card.image && (
                      <img
                        src={card.image} // Display image from URL
                        alt={card.title}
                        className="w-40 h-40 object-cover border rounded"
                      />
                    )}
                    <input
                      type="text"
                      value={card.image}
                      onChange={(e) => handleInputChange(index, 'image', e.target.value)}
                      className="input input-bordered w-full mb-2"
                      placeholder="Enter Image URL"
                    />
                  </div>
                </td>
                <td className="px-2 py-2 border">
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Title"
                  />
                </td>
                <td className="px-2 py-2 border">
                  <input
                    type="text"
                    value={card.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Description"
                  />
                </td>
                <td className="px-2 py-2 border">
                  <div className="hex flex items-center">
                    <HexColorPicker
                      color={card.flipBgColor}
                      onChange={(color) => handleInputChange(index, 'flipBgColor', color)}
                      className="w-12 h-12"
                    />
                    <input
                      type="text"
                      value={card.flipBgColor}
                      onChange={(e) => handleInputChange(index, 'flipBgColor', e.target.value)}
                      className="input input-bordered w-20 ml-2"
                      placeholder="#ffffff"
                    />
                  </div>
                </td>
                <td className="px-2 py-2 border">
                  <div className="hex flex items-center">
                    <HexColorPicker
                      color={card.flipTextColor}
                      onChange={(color) => handleInputChange(index, 'flipTextColor', color)}
                      className="w-12 h-12"
                    />
                    <input
                      type="text"
                      value={card.flipTextColor}
                      onChange={(e) => handleInputChange(index, 'flipTextColor', e.target.value)}
                      className="input input-bordered w-20 ml-2"
                      placeholder="#ffffff"
                    />
                  </div>
                </td>
                <td className="px-2 py-2 border">
                  <button
                    onClick={() => removeCard(index)}
                    className="btn btn-error btn-xs"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button
            onClick={addNewCard}
            className="btn btn-primary"
          >
            Add New Card
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-success"
          >
            Save Changes
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default GridCardsModal;
