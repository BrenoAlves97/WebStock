import React from 'react';

export const CustomInput = ({ label, value, setValue, ...props }) => {
   const handleChange = (e) => {
      setValue(e.target.value);
   };

   return (
      <>
         {label && <label className="text-gray-200 text-base sm:text-xl font-medium font-sans">{label}</label>}
         <input
            className="w-full rounded-lg h-9 px-3 py-2 mt-1 mb-4 text-base text-gray-800 font-mono border-0 bg-gray-200
           hover:bg-white focus:bg-white duration-200 outline-none pr-4 "
            value={value}
            onChange={handleChange}
            {...props}
         />
      </>
   );
};
