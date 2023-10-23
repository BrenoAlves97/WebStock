import React from 'react';

import styles from './custom-input.module.css';

export const CustomInput = ({ label, value, setValue, ...props }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} value={value} onChange={handleChange} {...props} />
    </>
  );
};
