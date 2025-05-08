import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_API_URL; // Base URL from .env

// Color scheme constants
const COLORS = {
  primary: "#2E8B57", // Green
  primaryLight: "#3CB371", // Lighter Green
  primaryDark: "#1E5A3A", // Darker Green
  secondary: "#FFD700", // Gold/Yellow
  secondaryLight: "#FFEC8B", // Lighter Yellow
  secondaryDark: "#FFC125", // Darker Yellow
  accent: "#FF7F50", // Coral/Orange
  lightGray: "#F8F8F8",
  darkGray: "#2D2D2D",
  white: "#FFFFFF",
  black: "#000000"
};

const GRADIENTS = {
  primary: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
  secondary: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.secondaryLight} 100%)`,
  dark: `linear-gradient(135deg, ${COLORS.darkGray} 0%, ${COLORS.black} 100%)`
};

const TeamModal = ({ isOpen, onClose }) => {
  const [team, setTeam] = useState({
    bgColor: COLORS.white, // Default white color
    textColor: COLORS.darkGray, 
    teamInfo: { 
      headings: { 
        title: 'Meet our team', 
        subheading: 'Exporting over around 10 million semi-skilled, and skilled human resources' 
      }, 
      members: [
        {
          name: 'Dancers',
          position: 'Queen',
          imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...'
        },
        {
          name: 'Jon Snow',
          position: 'King in the North',
          imageUrl: ''
        }
      ] 
    },
  });

  const [newMember, setNewMember] = useState({
    name: '',
    position: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const response = await fetch(`${API_URL}/about/team`);
        const data = await response.json();

        if (data) {
          setTeam(data); // Directly set the team data, including teamInfo
        } else {
          console.error('Fetched data does not contain valid team info:', data);
        }
      } catch (error) {
        console.error('Error fetching team info:', error);
      }
    };

    if (isOpen) {
      fetchTeamInfo();
    }
  }, [isOpen]);

  const handleInputChange = (index, field, value) => {
    const updatedMembers = [...team.teamInfo.members];
    updatedMembers[index][field] = value;
    setTeam({ ...team, teamInfo: { ...team.teamInfo, members: updatedMembers } });
  };

  const handleHeadingsChange = (field, value) => {
    setTeam({ ...team, teamInfo: { ...team.teamInfo, headings: { ...team.teamInfo.headings, [field]: value } } });
  };

  const handleColorChange = (field, color) => {
    setTeam({ ...team, [field]: color });
  };

  const handleNewMemberChange = (field, value) => {
    setNewMember({ ...newMember, [field]: value });
  };

  const addNewMember = () => {
    if (newMember.name && newMember.position) {
      setTeam((prevState) => ({
        ...prevState,
        teamInfo: {
          ...prevState.teamInfo,
          members: [...prevState.teamInfo.members, newMember],
        },
      }));
      setNewMember({ name: '', position: '', imageUrl: '' });
    }
  };

  const removeMember = (index) => {
    const updatedMembers = [...team.teamInfo.members];
    updatedMembers.splice(index, 1);
    setTeam({ ...team, teamInfo: { ...team.teamInfo, members: updatedMembers } });
  };

  const handleSave = async () => {
    try {
      const { bgColor, textColor, teamInfo } = team;
      const response = await fetch(`${API_URL}/about/team/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bgColor, textColor, teamInfo }),
      });

      if (!response.ok) {
        throw new Error('Failed to save team info');
      }
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Team Content Updated Successfully",
        showConfirmButton: false,
        timer: 3000,
      });
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error saving team info:', error);
    }
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div 
        className="modal-box w-11/12 max-w-5xl relative p-0 overflow-hidden"
        style={{ 
          border: `2px solid ${COLORS.primary}`,
          boxShadow: `0 10px 30px ${COLORS.darkGray}30`,
          maxHeight: '90vh' // Ensure modal doesn't exceed viewport height
        }}
      >
        {/* Modal header with gradient */}
        <div 
          className="p-4 text-white sticky top-0 z-10"
          style={{ background: GRADIENTS.primary }}
        >
          <h3 className="font-bold text-xl">Team Members Management</h3>
          <button 
            onClick={onClose} 
            className="btn btn-sm btn-circle absolute right-4 top-4"
            style={{ 
              background: COLORS.white,
              color: COLORS.primary,
              border: 'none'
            }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 130px)' }}>
          {/* Headings section */}
          <div className="mb-6 p-4 rounded-lg" style={{ background: COLORS.lightGray }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium" style={{ color: COLORS.primaryDark }}>Title:</label>
                <input
                  type="text"
                  value={team.teamInfo.headings.title}
                  onChange={(e) => handleHeadingsChange('title', e.target.value)}
                  className="input w-full"
                  style={{ 
                    borderColor: COLORS.primary,
                    focus: { borderColor: COLORS.primaryDark }
                  }}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" style={{ color: COLORS.primaryDark }}>Subheading:</label>
                <input
                  type="text"
                  value={team.teamInfo.headings.subheading}
                  onChange={(e) => handleHeadingsChange('subheading', e.target.value)}
                  className="input w-full"
                  style={{ borderColor: COLORS.primary }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium" style={{ color: COLORS.primaryDark }}>Background Color:</label>
                <input
                  type="color"
                  value={team.bgColor}
                  onChange={(e) => handleColorChange('bgColor', e.target.value)}
                  className="input w-full p-1 h-10"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" style={{ color: COLORS.primaryDark }}>Text Color:</label>
                <input
                  type="color"
                  value={team.textColor}
                  onChange={(e) => handleColorChange('textColor', e.target.value)}
                  className="input w-full p-1 h-10"
                />
              </div>
            </div>
          </div>

          {/* Team members table */}
          <div className="mb-6 overflow-x-auto">
            {team.teamInfo.members.length > 0 ? (
              <table className="table w-full">
                <thead>
                  <tr style={{ background: COLORS.lightGray }}>
                    <th style={{ color: COLORS.primaryDark }}>Name</th>
                    <th style={{ color: COLORS.primaryDark }}>Position</th>
                    <th style={{ color: COLORS.primaryDark }}>Image</th>
                    <th style={{ color: COLORS.primaryDark }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {team.teamInfo.members.map((member, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                          className="input input-bordered w-full"
                          style={{ borderColor: COLORS.primary }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={member.position}
                          onChange={(e) => handleInputChange(index, 'position', e.target.value)}
                          className="input input-bordered w-full"
                          style={{ borderColor: COLORS.primary }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={member.imageUrl}
                          onChange={(e) => handleInputChange(index, 'imageUrl', e.target.value)}
                          className="input input-bordered w-full mb-2"
                          style={{ borderColor: COLORS.primary }}
                          placeholder="Image URL"
                        />
                        {member.imageUrl && (
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2" style={{ borderColor: COLORS.secondary }}>
                            <img 
                              src={member.imageUrl} 
                              alt="Team Member" 
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = 'https://via.placeholder.com/150';
                              }}
                            />
                          </div>
                        )}
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm"
                          style={{ 
                            background: COLORS.accent,
                            color: COLORS.white,
                            border: 'none'
                          }}
                          onClick={() => removeMember(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center p-8" style={{ color: COLORS.darkGray }}>
                <p>No team members found. Add your first team member below.</p>
              </div>
            )}
          </div>

          {/* Add new member section */}
          <div className="p-4 rounded-lg" style={{ background: COLORS.lightGray }}>
            <h4 className="font-bold mb-4 text-lg" style={{ color: COLORS.primaryDark }}>Add New Team Member</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium" style={{ color: COLORS.primaryDark }}>Name:</label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={newMember.name}
                  onChange={(e) => handleNewMemberChange('name', e.target.value)}
                  className="input w-full"
                  style={{ borderColor: COLORS.primary }}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" style={{ color: COLORS.primaryDark }}>Position:</label>
                <input
                  type="text"
                  placeholder="Job title"
                  value={newMember.position}
                  onChange={(e) => handleNewMemberChange('position', e.target.value)}
                  className="input w-full"
                  style={{ borderColor: COLORS.primary }}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" style={{ color: COLORS.primaryDark }}>Image URL:</label>
                <input
                  type="text"
                  placeholder="Paste image URL"
                  value={newMember.imageUrl}
                  onChange={(e) => handleNewMemberChange('imageUrl', e.target.value)}
                  className="input w-full"
                  style={{ borderColor: COLORS.primary }}
                />
              </div>
            </div>
            <button 
              className="btn"
              style={{ 
                background: GRADIENTS.secondary,
                color: COLORS.black,
                border: 'none'
              }}
              onClick={addNewMember}
            >
              Add Member
            </button>
          </div>
        </div>

        {/* Modal footer - sticky at bottom */}
        <div className="modal-action p-4 sticky bottom-0 z-10" style={{ 
          background: COLORS.lightGray,
          borderTop: `1px solid ${COLORS.primary}20`
        }}>
          <button 
            className="btn mr-2"
            style={{ 
              background: COLORS.white,
              color: COLORS.primaryDark,
              border: `1px solid ${COLORS.primary}`
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="btn"
            style={{ 
              background: GRADIENTS.primary,
              color: COLORS.white,
              border: 'none'
            }}
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default TeamModal;