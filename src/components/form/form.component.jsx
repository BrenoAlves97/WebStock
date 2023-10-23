import React from 'react';

import { FiUpload } from 'react-icons/fi';

import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db, storage } from '../../firebase/firebase.app';

import { CustomInput } from './custom-input/custom-input.component';
import { CustomButton } from './custom-button/custom-button.component.jsx';
import { CustomTextArea } from './custom-text-area/custom-text-area.component.jsx';
import { CustomSelect } from './custom/custom-select.component.jsx';
import { CustomInputFile } from './custom-input-file/custom-input-file.component.jsx';

import styles from './form.module.css';

export const Form = () => {
  const [productName, setProductName] = React.useState('');
  const [productPrice, setProductPrice] = React.useState('');
  const [productDescription, setProductDescription] = React.useState('');
  const [quantityInStock, setQuantityInStock] = React.useState('');
  const [productCategory, setProductCategory] = React.useState('');
  const [img, setImg] = React.useState(null);
  const [imgDB, setImgDB] = React.useState(null);

  const clearInput = () => {
    setProductName('');
    setProductPrice('');
    setProductDescription('');
    setQuantityInStock('');
    setProductCategory('');
    setImg(null);
  };

  const handleSubmitPress = async (event) => {
    event.preventDefault();

    if (!imgDB) return;

    const checkInputs =
      productName !== '' &&
      productPrice !== '' &&
      productDescription !== '' &&
      quantityInStock !== '' &&
      productCategory !== '' &&
      img !== null;

    if (!checkInputs) return;

    try {
      const uploadRef = ref(storage, `images/${imgDB.name}`);
      uploadBytes(uploadRef, imgDB).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          let urlPhoto = downloadURL;
          const product = {
            id: Math.random(),
            name: productName,
            price: productPrice,
            description: productDescription,
            quantity: quantityInStock,
            category: productCategory,
            productImage: urlPhoto,
          };

          await addDoc(collection(db, '@products'), product).then(() => {
            console.log('Adicionado com sucesso!');
          });
        });
      });
    } catch (err) {
      console.log(err);
    } finally {
      clearInput();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmitPress}>
      <h2 className={styles.form_title}>Registre seu produto</h2>

      <div>
        <CustomInput
          id="name"
          type="text"
          label="Nome:"
          placeholder="Ex: Camisa de Crochê"
          value={productName}
          setValue={setProductName}
        />

        <CustomInput
          id="price"
          type="text"
          label="Preço:"
          placeholder="Ex: 49.90"
          value={productPrice}
          setValue={setProductPrice}
        />

        <CustomTextArea
          label="Sobre o produto:"
          id="description"
          name="description"
          placeholder="Digite sobre seu produto..."
          value={productDescription}
          setValue={setProductDescription}
        />

        <CustomInput
          id="amount"
          type="text"
          label="Quantidade em estoque"
          placeholder="Ex: 10"
          value={quantityInStock}
          setValue={setQuantityInStock}
        />

        <CustomSelect
          label="Selecione a categoria"
          id="category"
          name="category"
          value={productCategory}
          setValue={setProductCategory}
        />
      </div>

      <div className={styles.upload_container}>
        <CustomInputFile type="file" accept="image/*" value={img} setValue={setImg} setImgDB={setImgDB}>
          <FiUpload size={30} color="#000" />
        </CustomInputFile>
      </div>

      <div className={styles.grid_btn}>
        <CustomButton>Enviar</CustomButton>
      </div>
    </form>
  );
};
