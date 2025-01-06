import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { SideBar } from './SideBar';

export const RouterLayout: React.FC<{}> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="h-screen flex flex-col">
      <NavBar toggleSidebar={toggleSidebar} />

      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <Outlet />
    </div>
  );
};
