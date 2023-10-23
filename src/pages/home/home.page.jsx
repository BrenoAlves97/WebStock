import React from 'react';

import { Form } from '../../components/form/form.component.jsx';

import styles from './home.module.css';

export const Home = () => {
  return (
    <div className="container animeLeft">
      <div className={styles.home_container}>
        <Form />
      </div>
    </div>
  );
};
