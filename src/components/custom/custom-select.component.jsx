import React from 'react';

import styles from './custom-select.module.css';

export const CustomSelect = ({ id, label, value, setValue, ...props }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <select className={styles.select} value={value} onChange={handleChange} {...props}>
        <option value="">Selecione uma categoria</option>
        <option value="camisas">Camisas</option>
        <option value="bolsas">Bolsas</option>
        <option value="itens">Itens Diversos</option>
      </select>
    </>
  );
};
