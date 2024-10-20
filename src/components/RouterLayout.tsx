import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { SideBar } from './SideBar';

export const RouterLayout: React.FC<{}> = () => {
  return (
    <div className="grid min-h-screen grid-cols-12 grid-rows-[auto_1fr]">
      <NavBar />

      <SideBar />

      <Outlet />
    </div>
  );
};
