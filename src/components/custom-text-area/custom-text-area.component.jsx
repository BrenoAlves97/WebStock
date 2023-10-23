import React from 'react';

import styles from './custom-text-area.module.css';

export const CustomTextArea = ({ id, label, value, setValue, ...props }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea className={styles.text_area} value={value} onChange={handleChange} rows={5} {...props}></textarea>
    </>
  );
};
