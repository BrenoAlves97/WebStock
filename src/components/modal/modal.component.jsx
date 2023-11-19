import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { storage, db } from '../../firebase/firebase.app';

export const Modal = ({ item, handleItem, handleProducts }) => {
  const [loading, setLoading] = React.useState(false);

  const handleRemoveItem = async () => {
    setLoading(true);
    await deleteDoc(doc(db, '@products', String(item.id)))
      .then(async () => {
        item.images.map(async (image) => {
          const imagePath = `images/${image.id}`;
          const imageRef = ref(storage, imagePath);
          await deleteObject(imageRef).then(async () => {
            handleProducts((products) => products.filter((product) => product.id !== item.id));
          });
        });
        setLoading(false);
        handleItem(null);
        return toast.success('Produto removido de sua lista');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        return toast.error('Houve algum erro...');
      });
  };

  return (
    <div className="fixed top-0 left-0 z-30 w-full h-screen flex items-center justify-center bg-gray-400/40 px-6">
      <div className="flex flex-col bg-gray-300 rounded-lg max-w-sm p-5 gap-4">
        <p className="w-full font-medium text-base text-gray-700 text-center">
          Deseja excluir <span className="font-bold">{item.name.toLowerCase()}</span> do seu Estoque?
        </p>
        <div className="w-full flex items-center justify-center gap-6">
          <button
            onClick={handleRemoveItem}
            className="flex items-center justify-center px-4 py-2 font-bold bg-red-500 border-2 border-transparent rounded-lg text-gray-800 duration-200  gap-2 group ring-2 ring-transparent hover:ring-gray-800"
          >
            {!loading ? (
              <>
                <FiTrash2 className="group-hover:scale-110 duration-200" size={18} color="#141414" />
                <span className="group-hover:text-gray-900 duration-200">Sim</span>
              </>
            ) : (
              <ClipLoader size={18} color="#141414" />
            )}
          </button>
          <button
            onClick={() => handleItem(null)}
            className="px-5 py-2 font-bold flex items-center justify-center border-2 border-gray-600 text-green-600 rounded-lg bg-white hover:bg-green-600 hover:text-white duration-200"
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
};
