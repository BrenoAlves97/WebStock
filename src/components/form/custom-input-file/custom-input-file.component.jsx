import React from 'react';

import Logo from '../../../assets/img_croche.jpg';

export const CustomInputFile = ({ children, id, handleFile, ...props }) => {
  return (
    <div className="flex items-center justify-center relative rounded-full duration-75 border-2 border-transparent hover:border-gray-500/80">
      <button className="cursor-pointer flex items-center justify-center absolute">
        <div>
          <span className="cursor-pointer">{children}</span>
        </div>
        <div className="cursor-pointer w-full relative items-center flex justify-center group">
          <input onChange={(event) => handleFile(event)} {...props} className="opacity-0 cursor-pointer absolute" />
        </div>
      </button>
      <img className="w-52 h-52 rounded-full object-cover object-center" src={Logo} alt="Imagem Inicial de Crochê" />
    </div>
  );
};
