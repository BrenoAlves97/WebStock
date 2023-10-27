import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.app';

import { CustomButton } from '../../components/form/custom-button/custom-button.component';
import { CustomInput } from '../../components/form/custom-input/custom-input.component';
import { CustomTextArea } from '../../components/form/custom-text-area/custom-text-area.component';

import styles from './edit.module.css';

export const Edit = () => {
  const [productName, setProductName] = React.useState('');
  const [productPrice, setProductPrice] = React.useState('');
  const [productDescription, setProductDescription] = React.useState('');
  const [quantityInStock, setQuantityInStock] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const docRef = doc(db, '@products', id);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());

      setProductName(docSnap.data().name);
      setProductPrice(docSnap.data().price);
      setProductDescription(docSnap.data().description);
      setQuantityInStock(docSnap.data().quantity);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);
    const docRef = doc(db, '@products', id);
    await updateDoc(docRef, {
      name: productName,
      description: productDescription,
      price: productPrice,
      quantity: quantityInStock,
    })
      .then(() => {
        toast.success('Produto atualizado com sucesso!');
        return navigate('/estoque');
      })
      .catch((err) => {
        return toast.error('Ops... houve algum erro...');
      });
  };

  return (
    <div className="container animeLeft">
      {loading && <h2>Carregando informações...</h2>}
      {!loading && (
        <form className={styles.form} onSubmit={handleUpdate}>
          <h2>Edite informações do produto</h2>
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
          </div>

          <div>
            <CustomButton>{loading ? 'Editando produto...' : 'Editar produto'}</CustomButton>
          </div>
        </form>
      )}
    </div>
  );
};
