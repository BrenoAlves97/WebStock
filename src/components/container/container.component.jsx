import React from 'react';

export const Container = ({ children }) => {
  return (
    <div className="w-full bg-gray-300 px-6 bg-gradient-to-r from-gray-600 via-slate-800 to-gray-900 py-6 flex-1 h-screen flex items-center justify-center">
      {children}
    </div>
  );
};
