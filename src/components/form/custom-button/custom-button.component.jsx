import React from 'react';

import styles from './custom-button.module.css';

export const CustomButton = ({ children, onClick, ...props }) => {
  return (
    <button onClick={onClick} className={styles.button} {...props}>
      {children}
    </button>
  );
};
