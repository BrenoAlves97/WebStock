import React from 'react';

import styles from './custom-button.module.css';

export const CustomButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};
