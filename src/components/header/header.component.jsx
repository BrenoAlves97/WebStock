import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { AuthContext } from '../../contexts/auth-context.jsx';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.app.js';

export const Header = () => {
   const navigate = useNavigate();

   const { user } = React.useContext(AuthContext);

   const handleNavigateProducts = () => {
      navigate('/estoque', { replace: true });
   };

   const handleNavigateHome = () => {
      navigate('/', { replace: true });
   };

   const handleSingOut = async () => {
      await signOut(auth);
      return toast.success('Até a próxima...');
   };

   return (
      <header className="bg-gradient-to-r from-gray-600 via-slate-800 to-gray-900 h-16 sm:h-20 text-white items-center flex w-full px-6 border-b-2 border-gray-600">
         <div className="w-full max-w-5xl mx-auto flex items-center justify-between text-gray-100">
            <h2
               className="text-3xl sm:text-4xl font-bold  cursor-pointer hover:text-gray-300 duration-200 font-mono"
               onClick={handleNavigateHome}
            >
               Estoque<span className="text-gray-200 font-bold">Web</span>
            </h2>

            {user && (
               <span className="items-center gap-1 ml-4 text-base font-bold text-gray-300 hidden sm:flex">
                  <span>
                     <FiUser size={16} color="#f7f7f7" />
                  </span>
                  {user.email}
               </span>
            )}

            <nav className="flex items-center justify-center gap-3">
               <p
                  className="font-bold font-mono text-base cursor-pointer hover:text-gray-300 duration-200 border-transparent border-l-2 hover:border-l-white pl-2"
                  onClick={handleNavigateProducts}
               >
                  Estoque
               </p>

               <button onClick={handleSingOut} className="p-3 group">
                  <FiLogOut className="group-hover:scale-110 duration-150" size={18} color="#f7f7f7" />
               </button>
            </nav>
         </div>
      </header>
   );
};
