import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

// Fetch the base API URL from environment variables
const API_URL = `${import.meta.env.VITE_API_URL}`; // Using the VITE_API_URL with the endpoint

const FAQModal = ({ isOpen, onClose }) => {
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    bgColor: "#000000",
    textColor: "#FFFFFF",
    faqBgColor: "#FFFFFF",
    faqTextColor: "#000000",
    faqs: []
  });

  useEffect(() => {
    if (isOpen) {
      // Fetch existing FAQ data from the server
      const fetchFAQData = async () => {
        try {
          const response = await fetch(`${API_URL}/about/faq/`);
          if (!response.ok) {
            throw new Error("Failed to fetch FAQ data");
          }
          const faqData = await response.json();
          setData(faqData);
        } catch (error) {
          console.error("Error fetching FAQ data:", error);
        }
      };

      fetchFAQData();
    }
  }, [isOpen]);

  // Handle input changes for title, subtitle, colors, and FAQs
  const handleInputChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleColorChange = (field, color) => {
    setData((prevData) => ({
      ...prevData,
      [field]: color
    }));
  };

  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...data.faqs];
    updatedFaqs[index][field] = value;
    setData((prevData) => ({
      ...prevData,
      faqs: updatedFaqs
    }));
  };

  // Handle adding a new FAQ
  const handleAddFaq = () => {
    const newFaq = { question: '', answer: '' };
    setData((prevData) => ({
      ...prevData,
      faqs: [...prevData.faqs, newFaq]
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/about/faq/`, {
        method: 'PATCH', // Using PATCH to update existing data
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Send the updated data
      });
      if (!response.ok) {
        throw new Error('Failed to update FAQ data');
      }
      console.log('FAQ data updated successfully');
    } catch (error) {
      console.error("Error submitting FAQ data:", error);
    }
    onClose(); // Close modal after saving
    window.location.reload()
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-11/12 max-w-2xl relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>

        <h3 className="font-bold text-lg mb-4">Edit FAQ Section</h3>

        <div className="mb-4">
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="input input-bordered w-full mb-1"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Subtitle:</label>
          <textarea
            value={data.subtitle}
            onChange={(e) => handleInputChange('subtitle', e.target.value)}
            className="textarea textarea-bordered w-full mb-1"
            rows={3}
          />
        </div>

        {/* Color Inputs */}
        <label className="block mr-2">Background Color:</label>
        <div className="mb-4 hex flex items-center">
          <HexColorPicker
            color={data.bgColor}
            onChange={(color) => handleColorChange('bgColor', color)}
          />
          <input
            type="text"
            value={data.bgColor}
            onChange={(e) => handleColorChange('bgColor', e.target.value)}
            className="input input-bordered w-20 ml-2"
          />
        </div>

        <label className="block mr-2">Text Color:</label>
        <div className="mb-4 hex flex items-center">
          <HexColorPicker
            color={data.textColor}
            onChange={(color) => handleColorChange('textColor', color)}
          />
          <input
            type="text"
            value={data.textColor}
            onChange={(e) => handleColorChange('textColor', e.target.value)}
            className="input input-bordered w-20 ml-2"
          />
        </div>

        <label className="block mr-2">FAQ Background Color:</label>
        <div className="mb-4 hex flex items-center">
          <HexColorPicker
            color={data.faqBgColor}
            onChange={(color) => handleColorChange('faqBgColor', color)}
          />
          <input
            type="text"
            value={data.faqBgColor}
            onChange={(e) => handleColorChange('faqBgColor', e.target.value)}
            className="input input-bordered w-20 ml-2"
          />
        </div>

        <label className="block mr-2">FAQ Text Color:</label>
        <div className="mb-4 hex flex items-center">
          <HexColorPicker
            color={data.faqTextColor}
            onChange={(color) => handleColorChange('faqTextColor', color)}
          />
          <input
            type="text"
            value={data.faqTextColor}
            onChange={(e) => handleColorChange('faqTextColor', e.target.value)}
            className="input input-bordered w-20 ml-2"
          />
        </div>

        <table className="table w-full mb-4">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.faqs.map((faq, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                    className="input input-bordered w-full"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                    className="input input-bordered w-full"
                  />
                </td>
                <td>
                  <button className="btn btn-secondary btn-sm" onClick={() => {
                    const updatedFaqs = data.faqs.filter((_, i) => i !== index);
                    setData((prevData) => ({
                      ...prevData,
                      faqs: updatedFaqs
                    }));
                  }}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mb-4">
          <button className="btn btn-primary" onClick={handleAddFaq}>Add FAQ</button>
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    </dialog>
  );
};

export default FAQModal;
