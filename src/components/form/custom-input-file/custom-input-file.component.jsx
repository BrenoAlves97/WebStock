import React from 'react';

import Logo from '../../../assets/img_croche.jpg';

export const CustomInputFile = ({ children, id, value, setValue, setImgDB, ...props }) => {
  const [image, setImage] = React.useState(null);

  const handleChange = (e) => {
    const result = e.target.files[0];

    if (result) {
      if (result.type === 'image/jpeg' || result.type === 'image/png') {
        setImgDB(result);
        const img = URL.createObjectURL(result);
        setValue(img);
      }
    } else {
      setValue(null);
      return;
    }
  };

  return (
    <div className="flex items-center justify-center relative rounded-full duration-75 border-2 border-transparent hover:border-gray-500/80">
      <button className="cursor-pointer flex items-center justify-center absolute">
        <div>
          <span className="cursor-pointer">{children}</span>
        </div>
        <div className="cursor-pointer w-full relative items-center flex justify-center group">
          <input onChange={handleChange} {...props} className="opacity-0 cursor-pointer absolute" />
        </div>
      </button>
      <img
        className="w-52 h-52 rounded-full object-cover object-center"
        src={value ? value : Logo}
        alt="Imagem Inicial de Crochê"
      />
    </div>
  );
};
