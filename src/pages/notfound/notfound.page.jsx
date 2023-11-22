import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from '../../components/container/container.component.jsx';

export const Notfound = () => {
   return (
      <Container>
         <div className="text-center">
            <h1 className="text-3xl sm:text-4xl  md:text-5xl font-thin text-gray-200 mb-6">
               Ops... Página não encontrada!
            </h1>
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
