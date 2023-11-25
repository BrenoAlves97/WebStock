import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertOctagon } from 'react-icons/fi';
import { TbError404 } from 'react-icons/tb';

import { Container } from '../../components/container/container.component.jsx';
import { ChangeTitle } from '../../components/change-title-page/change-title.component.jsx';

export const Notfound = () => {
   return (
      <Container>
         <ChangeTitle title="404" />
         <div className="text-center animate-fadeOn">
            <div className="flex items-center flex-col gap-1">
               <div className="flex items-center justify-center gap-2">
                  <FiAlertOctagon size={80} color="#FFFF00" />
                  <TbError404 size={80} color="#FFFF00" />
               </div>
               <h1 className="pt-6 text-2xl sm:text-3xl md:text-5xl font-black text-gray-200 mb-6">
                  Ops... Página não encontrada!
               </h1>
            </div>
            <p className="text-gray-300">
               Retornar a página
               <span className="ml-1 text-base md:text-xl text-white font-bold border-b border-transparent hover:border-white duration-200 cursor-pointer ">
                  <Link>inicial...</Link>
               </span>
            </p>
         </div>
      </Container>
   );
};
