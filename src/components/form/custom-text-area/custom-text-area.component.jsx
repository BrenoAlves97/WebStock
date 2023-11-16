import React from 'react';

export const CustomTextArea = ({ id, label, value, setValue, ...props }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <label className="text-gray-200 font-medium text-base sm:text-xl font-sans" htmlFor={id}>
        {label}
      </label>
      <textarea
        className="w-full rounded-lg outline-none border-0 bg-gray-200 hover:bg-white focus:bg-white duration-200 px-3 py-2 mt-1 mb-4 text-base text-gray-800 font-mono resize-none"
        value={value}
        id={id}
        onChange={handleChange}
        rows={5}
        {...props}
      ></textarea>
    </>
  );
};
