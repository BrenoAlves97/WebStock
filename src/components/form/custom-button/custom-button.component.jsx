import React from 'react';

export const CustomButton = ({ children, onClick, loading, ...props }) => {
  return (
    <button
      style={{ cursor: `${loading ? 'not-allowed' : 'pointer'}` }}
      onClick={onClick}
      className={`w-full mt-8 h-9 flex items-center justify-center rounded-lg text-center bg-gradient-to-l from-gray-300 via-gray-200 to-gray-100 duration-100 opacity-90 hover:opacity-100 cursor-pointer
      font-bold font-sans text-base
      ${loading && 'cursor-not-allowed opacity-70'}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
