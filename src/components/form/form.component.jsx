import React from 'react';
import { toast } from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';

import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db, storage } from '../../firebase/firebase.app';

import { CustomInput } from './custom-input/custom-input.component';
import { CustomButton } from './custom-button/custom-button.component.jsx';
import { CustomTextArea } from './custom-text-area/custom-text-area.component.jsx';
import { CustomSelect } from './custom/custom-select.component.jsx';
import { CustomInputFile } from './custom-input-file/custom-input-file.component.jsx';

import styles from './form.module.css';

export const Form = () => {
  // states -> send to firebase
  const [productName, setProductName] = React.useState('');
  const [productPrice, setProductPrice] = React.useState('');
  const [productDescription, setProductDescription] = React.useState('');
  const [quantityInStock, setQuantityInStock] = React.useState('');
  const [productCategory, setProductCategory] = React.useState('');
  const [img, setImg] = React.useState(null);
  const [imgDB, setImgDB] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

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
      setLoading(true);
      const uploadRef = ref(storage, `images/${imgDB.name}`);
      uploadBytes(uploadRef, imgDB).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          let urlPhoto = downloadURL;
          const product = {
            date: new Date(),
            id: Math.floor(Math.random() * 1000),
            name: productName,
            price: productPrice,
            description: productDescription,
            quantity: quantityInStock,
            category: productCategory,
            productImage: urlPhoto,
            sales: 0,
          };

          const docRef = doc(db, '@products', `${product.id}`);

          await setDoc(docRef, product).then(() => {
            toast.success('Produto adicionado com sucesso!');
            setLoading(false);
            return clearInput();
          });
        });
      });
    } catch (err) {
      toast.error('Houve algum erro.');
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
          <FiUpload size={25} color="#000" />
        </CustomInputFile>
      </div>

      <div className={styles.grid_btn}>
        <CustomButton loading={loading}>{loading ? 'Adicionando produto...' : 'Adicionar produto'}</CustomButton>
      </div>
    </form>
  );
};
