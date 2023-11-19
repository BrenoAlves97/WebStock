import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash, FiEdit2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { doc, deleteDoc, getDocs, collection } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebase/firebase.app.js';

export const Dashboard = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const formatedValue = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, '@products'));
      let arrData = [];
      querySnapshot.forEach((doc) => {
        arrData.push({
          id: doc.data().id,
          name: doc.data().name,
          category: doc.data().category,
          price: doc.data().price.replace(',', '.'),
          quantity: doc.data().quantity,
          sales: doc.data().sales,
          images: doc.data().images,
        });

        setProducts(arrData);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditItem = (productId) => {
    navigate(`/editar/${productId}`);
  };

  const handleRemoveItem = async (product) => {
    await deleteDoc(doc(db, '@products', String(product.id)))
      .then(async () => {
        product.images.map(async (image) => {
          const imagePath = `images/${image.id}`;
          const imageRef = ref(storage, imagePath);
          await deleteObject(imageRef).then(async () => {
            setProducts((products) => products.filter((item) => item.id !== product.id));
          });
        });
        return toast.success('Produto removido de sua lista');
      })
      .catch((err) => {
        return toast.error('Houve algum erro...');
      });
  };

  if (loading)
    return (
      <div className="w-full max-w-3xl mx-auto flex items-center text-center justify-center mt-24">
        <h2 className="font-medium text-xl sm:text-2xl text-white">Buscando produtos...</h2>
      </div>
    );

  if (products.length === 0)
    return (
      <div className="w-full max-w-3xl mx-auto items-center text-center flex justify-center mt-24">
        <h2 className="font-medium text-xl sm:text-2xl text-white">Nenhum produto encontrado...</h2>
      </div>
    );

  return (
    products.length > 0 &&
    !loading && (
      <>
        <div className="w-full max-w-4xl mx-auto ">
          <div className="w-full text-gray-50">
            <div>
              <div className="w-full flex text-white text-center font-mediun text-base sm:text-xl uppercase">
                <span className="flex-1">Nome</span>
                <span className="flex-1">Preço</span>
                <span className="flex-1 hidden sm:inline-block">Estoque</span>
                <span className="flex-1 hidden sm:inline-block">Categoria</span>
                <span className="flex-1">Vendas</span>
                <span className="flex-1">Ações</span>
              </div>
            </div>

            <ul className="w-full mt-4 space-y-1 py-2 px-1 edited-height overflow-y-auto">
              {products.map((item) => (
                <li
                  key={item.id}
                  className="flex text-center p-1 items-center text-[14px] sm:text-base bg-gray-600/50 hover:bg-gray-600/80 duration-200 min-h-[60px] rounded-lg "
                >
                  <span className="flex-1 lowercase">{item.name}</span>
                  <span className="flex-1">{formatedValue.format(Number(item.price))}</span>
                  <span className="flex-1 hidden sm:inline-block">{item.quantity}</span>
                  <span className="flex-1 hidden sm:inline-block">{item.category}</span>
                  <span className="flex-1 hidden sm:inline-block">{item.sales}</span>
                  <span className="flex-1">
                    <span className="space-x-4">
                      <button>
                        <FiTrash size={18} color="#fff" className="" onClick={() => handleRemoveItem(item)} />
                      </button>
                      <button>
                        <FiEdit2 size={18} color="#fff" className="" onClick={() => handleEditItem(item.id)} />
                      </button>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  );
};
