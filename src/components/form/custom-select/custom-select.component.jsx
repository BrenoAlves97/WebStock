import React from 'react';

export const CustomSelect = ({ id, label, value, setValue, data, ...props }) => {
   const handleChange = (e) => {
      setValue(e.target.value);
   };

   return (
      <>
         <label className="text-base sm:text-xl text-gray-200 font-sans" htmlFor={id}>
            {label}
         </label>
         {data && (
            <select
               className="w-full rounded-lg outline-none border-0 bg-gray-200 hover:bg-white focus:bg-white duration-200 px-3 py-1 mt-1 mb-4 text-gray-800"
               value={value}
               onChange={handleChange}
               {...props}
            >
               <option value="">Selecione</option>
               {data.map((item) => (
                  <option key={item} value={item}>
                     {item}
                  </option>
               ))}
            </select>
         )}
      </>
   );
};
