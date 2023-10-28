import React from 'react';

import styles from './custom-button.module.css';

export const CustomButton = ({ children, onClick, loading, ...props }) => {
  return (
    <button
      style={{ cursor: `${loading ? 'not-allowed' : 'pointer'}` }}
      onClick={onClick}
      className={styles.button}
      {...props}
    >
      {children}
    </button>
  );
};
