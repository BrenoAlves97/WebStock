import React from 'react';

export const CustomSelect = ({ id, label, value, setValue, ...props }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <label className="text-base sm:text-xl text-gray-200 font-sans" htmlFor={id}>
        {label}
      </label>
      <select
        className="w-full rounded-lg outline-none border-0 bg-gray-200 hover:bg-white focus:bg-white duration-200 px-3 py-1 mt-1 mb-4 text-gray-800"
        value={value}
        onChange={handleChange}
        {...props}
      >
        <option value="">Escolha</option>
        <option value="camisas">Camisas</option>
        <option value="bolsas">Bolsas</option>
        <option value="itens">Itens Diversos</option>
      </select>
    </>
  );
};
