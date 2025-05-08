import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminNavbar = ({ toggleSidebar }) => {
  const [theme, setTheme] = useState('light');
  const { user, logout } = useAuth(); 


  // On component mount, check if a theme is saved in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  // Toggle theme between light and dark
  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="navbar bg-base-100 dark:bg-black ml-0 dark:text-white ">
      <div tabIndex={0} role="button" onClick={toggleSidebar} className="btn btn-ghost btn-circle lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </div>

      {/* Light/dark toggle */}
      <div className='flex gap-2'>
        <p className='text-xs'>Light</p>
        <input
          type="checkbox"
          className="toggle"
          checked={theme === 'dark'}
          onChange={handleThemeToggle}
        />
        <p className='text-xs'>Dark</p>
      </div>

      <div className="flex-1">
        <a className="btn btn-ghost text-lg md:text-xl"></a>
      </div>

      
    </div>
  );
};

export default AdminNavbar;
