import React from 'react';

import Logo from '../../../assets/img_croche.jpg';

import styles from './custom-input-file.module.css';

export const CustomInputFile = ({ children, id, value, setValue, setImgDB, ...props }) => {
  const [image, setImage] = React.useState(null);

  const handleChange = (e) => {
    const result = e.target.files[0];

    if (result) {
      if (result.type === 'image/jpeg' || result.type === 'image/png') {
        setImgDB(result);
        const img = URL.createObjectURL(result);
        setValue(img);
      }
    } else {
      setValue(null);
      return;
    }
  };

  return (
    <div className={styles.input_container}>
      <span>{children}</span>
      <input onChange={handleChange} {...props} />
      <img
        className={value && styles.active_image}
        src={value ? value : Logo}
        alt="Imagem Inicial de Crochê"
        width={170}
        height={170}
      />
    </div>
  );
};
