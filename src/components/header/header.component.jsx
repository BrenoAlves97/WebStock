import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  const handleNavigateProducts = () => {
    navigate('/estoque', { replace: true });
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-gray-600 via-slate-800 to-gray-900 h-16 sm:h-20 text-white items-center flex w-full px-6 border-b-2 border-gray-600">
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between text-gray-100">
        <h2
          className="text-3xl sm:text-4xl font-bold  cursor-pointer hover:text-gray-300 duration-200 font-mono"
          onClick={handleNavigateHome}
        >
          Logo Empresa
        </h2>

        <nav className="flex items-center justify-center">
          <p
            className="font-medium font-mono text-base cursor-pointer hover:text-gray-300 duration-200"
            onClick={handleNavigateProducts}
          >
            Estoque
          </p>
        </nav>
      </div>
    </header>
  );
};
