import React from 'react';

export const Footer = () => {
  return (
    <footer
      className="w-full bg-gradient-to-r from-gray-600 via-slate-800 to-gray-900
      pb-4 border-t-2 border-gray-600 pt-2
    "
    >
      <div className="max-w-3xl mx-auto w-full h-16 sm:h-20 text-white font-bold text-base flex items-center justify-center">
        <p className="break-words text-center font-mono">
          Empresa {new Date().getFullYear()} todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
