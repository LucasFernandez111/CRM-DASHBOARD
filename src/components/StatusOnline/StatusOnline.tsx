'use client';
import { useOnlineStatus } from '@/hooks/useOnlineStatus/useOnlineStatus';
import React from 'react';
import { MdOutlineWifiOff } from 'react-icons/md';

export type StatusOnlineProps = {
  children?: React.ReactNode;
};

const StatusOnline: React.FC<StatusOnlineProps> = ({ children }) => {
  const isOnline = useOnlineStatus();

  return isOnline ? (
    children
  ) : (
    <div className="bg-customSteelblue flex h-screen flex-col items-center justify-center space-y-10 text-white font-normal text-xl ">
      <MdOutlineWifiOff size={100} color="white" />
      <div className="text-center">
        <h1>Sin conexión a internet</h1>
      </div>
    </div>
  );
};

export default StatusOnline;
