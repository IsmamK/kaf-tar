import React, { useState, useRef  } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/layout_components/AdminNavbar';
import AdminSidebar from '../components/layout_components/AdminSideBar';
// import AdminContentLayout from './HomeEditor';



  const AdminLayout = () => {
   
   
  
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const handleSidebarToggle = () => {
      setIsSidebarOpen((prevState) => !prevState);
    };
  
    return (
      <div className='flex min-h-screen m-0 dark:bg-black'>
        <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={handleSidebarToggle} />
        <div className='flex-grow dark:bg-black'>
          <AdminNavbar toggleSidebar={handleSidebarToggle} />
          <Outlet />
          </div>
      </div>
    );
  };
  
  export default AdminLayout;

