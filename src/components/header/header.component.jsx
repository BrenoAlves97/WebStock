import React from 'react';

import styles from './header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>Achei Crochê</h2>

      <nav className={styles.nav}>
        <p>Estoque</p>
      </nav>
    </header>
  );
};
