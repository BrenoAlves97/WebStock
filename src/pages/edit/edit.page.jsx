import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.app';

import { CustomButton } from '../../components/form/custom-button/custom-button.component';
import { CustomInput } from '../../components/form/custom-input/custom-input.component';
import { CustomTextArea } from '../../components/form/custom-text-area/custom-text-area.component';

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
      name: productName.toUpperCase(),
      description: productDescription,
      price: productPrice,
      quantity: quantityInStock,
    })
      .then(() => {
        toast.success('Produto atualizado com sucesso!');
        setLoading(false);
        return navigate('/estoque');
      })
      .catch((err) => {
        setLoading(false);
        return toast.error('Ops... houve algum erro...');
      });
  };

  return (
    <div className="flex-1 w-full bg-gray-300 px-6 bg-gradient-to-r from-gray-600 via-slate-800 to-gray-900 py-6">
      {loading && (
        <div className="w-full max-w-4xl mx-auto items-center text-center flex justify-center mt-24">
          <h2 className="font-medium text-xl sm:text-2xl text-white">Carregando informações...</h2>
        </div>
      )}

      {!loading && (
        <form className="w-full max-w-4xl px-6 mx-auto mb-6" onSubmit={handleUpdate}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white my-6 font-sans">Editar Produto</h2>
          <div>
            <CustomInput
              id="name"
              type="text"
              label="Nome:"
              placeholder="Camisa de Crochê"
              value={productName}
              setValue={setProductName}
            />

            <CustomInput
              id="price"
              type="text"
              label="Preço:"
              placeholder="49.90"
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
              placeholder="10"
              value={quantityInStock}
              setValue={setQuantityInStock}
            />
          </div>

          <div>
            <CustomButton>{loading ? <ClipLoader size={16} color="#141414" /> : 'Editar produto'}</CustomButton>
          </div>
        </form>
      )}
    </div>
  );
};
