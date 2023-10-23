import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './header.module.css';

export const Header = () => {
  const navigate = useNavigate();

  const handleNavigateProducts = () => {
    navigate('/estoque');
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        <h2 className={styles.logo} onClick={handleNavigateHome}>
          Achei Crochê
        </h2>

        <nav className={styles.nav}>
          <p onClick={handleNavigateProducts}>Estoque</p>
        </nav>
      </div>
    </header>
  );
};
