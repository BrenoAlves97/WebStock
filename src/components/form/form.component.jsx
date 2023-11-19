import React from 'react';
import { toast } from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';
import { v4 as uuidV4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db, storage } from '../../firebase/firebase.app';

import { CustomInput } from './custom-input/custom-input.component';
import { CustomButton } from './custom-button/custom-button.component.jsx';
import { CustomTextArea } from './custom-text-area/custom-text-area.component.jsx';
import { CustomSelect } from './custom/custom-select.component.jsx';
import { CustomInputFile } from './custom-input-file/custom-input-file.component.jsx';

export const Form = () => {
  // states -> send to firebase
  const [productName, setProductName] = React.useState('');
  const [productPrice, setProductPrice] = React.useState('');
  const [productDescription, setProductDescription] = React.useState('');
  const [quantityInStock, setQuantityInStock] = React.useState('');
  const [productCategory, setProductCategory] = React.useState('');
  const [imagesArr, setImagesArr] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  const [imagesLoadUrl, setImagesLoadUrl] = React.useState([]);

  const navigate = useNavigate();

  const handleImagesLoad = (image) => {
    setImagesLoadUrl((prevState) => [...prevState, image.url]);
  };

  const clearInput = () => {
    setProductName('');
    setProductPrice('');
    setProductDescription('');
    setQuantityInStock('');
    setProductCategory('');
  };

  const handleUpload = async (file) => {
    const imageId = uuidV4();

    const uploadRef = ref(storage, `images/${imageId}`);

    await uploadBytes(uploadRef, file)
      .then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then((downloadUrl) => {
          const previewImage = {
            id: imageId,
            previewUrl: URL.createObjectURL(file),
            url: downloadUrl,
          };

          setImagesArr((prevState) => [...prevState, previewImage]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFile = async (event) => {
    const result = event.target.files[0];
    if (result) {
      if (result.type === 'image/png' || result.type === 'image/jpeg') {
        await handleUpload(result);
      } else {
        toast.error('Tipo não suportado...');
      }
    }
  };

  const handleSubmitPress = async (e) => {
    e.preventDefault();

    if (imagesArr.length === 0) return toast.error('Insira ao menos uma imagem...');

    const checkInputs =
      productName === '' &&
      productCategory === '' &&
      productDescription === '' &&
      productPrice === '' &&
      quantityInStock === '';

    if (!checkInputs) {
      const idDoc = uuidV4();

      const product = {
        id: idDoc,
        name: productName,
        price: productPrice,
        description: productDescription,
        category: productCategory,
        sales: 0,
        quantity: quantityInStock,
        created: new Date(),
        images: imagesArr,
      };

      const ref = doc(db, '@products', idDoc);
      setLoading(true);
      await setDoc(ref, product)
        .then(() => {
          toast.success('Produto adicionado com sucesso...');
          setImagesArr([]);
          clearInput();
          navigate('estoque', { replace: true });
          setLoading(false);
          return;
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          return toast.error('Ocorreu algum erro...');
        });
    } else {
      return toast.error('Verique todos os campos...');
    }
  };

  return (
    <form className="w-full mb-6" onSubmit={handleSubmitPress}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white my-6 font-sans">Registre seu produto</h2>

      <div className="flex gap-8 sm:flex-row flex-col">
        <div className="flex-1">
          <CustomInput
            id="name"
            type="text"
            label="Nome:"
            placeholder="Nome do produto"
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

          <CustomSelect
            label="Selecione a categoria"
            id="category"
            name="category"
            value={productCategory}
            setValue={setProductCategory}
          />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <CustomInputFile type="file" accept="image/*" handleFile={handleFile}>
            <FiUpload size={25} color="#fff" />
          </CustomInputFile>
        </div>
      </div>

      <div className="w-full borde-2 border-gray-700/25 rounded-lg my-12">
        <div className="w-full flex gap-2 items-center justify-center flex-wrap sm:flex-nowrap">
          {imagesArr.length > 0 ? (
            imagesArr.map((image) => (
              <div key={image.id} className="w-full">
                <div
                  className="w-full h-48 sm:h-52 bg-gray-400 rounded-lg"
                  style={{ display: !imagesLoadUrl.includes(image.url) ? 'block' : 'none' }}
                >
                  <div className="w-full h-full items-center justify-center flex">
                    <ClipLoader size={24} color="#141414" />
                  </div>
                </div>

                <img
                  style={{ display: imagesLoadUrl.includes(image.url) ? 'block' : 'none' }}
                  onLoad={() => handleImagesLoad(image)}
                  className="w-full h-48 sm:h-52 object-cover object-center rounded-lg"
                  src={image.url}
                  alt={image.id}
                />
              </div>
            ))
          ) : (
            <div className="flex-1 text-center">
              <h2 className="text-base text-gray-50 font-sans font-bold">Nenhuma imagem adicionada...</h2>
            </div>
          )}
        </div>
      </div>

      <div className="w-full">
        <CustomButton loading={loading}>
          {loading ? <ClipLoader size={16} color="#141414" /> : 'Adicionar produto'}
        </CustomButton>
      </div>
    </form>
  );
};
