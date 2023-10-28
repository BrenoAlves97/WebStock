import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash, FiEdit2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { doc, deleteDoc, getDocs, collection, query, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.app.js';

import styles from './dashboard.module.css';

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

  const handleRemoveItem = async (productId) => {
    await deleteDoc(doc(db, '@products', String(productId)))
      .then(async () => {
        toast.success('Produto removido de sua lista');
        return await fetchProducts();
      })
      .catch((err) => {
        return toast.error('Houve algum erro...');
      });
  };

  if (loading) return <h2 className={`container ${styles.loading_message}`}>Buscando produtos...</h2>;

  if (products.length === 0)
    return <h2 className={`container ${styles.error_message}`}>Nenhum produto encontrado...</h2>;

  return (
    products.length > 0 &&
    !loading && (
      <div className={styles.category_content}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Preço</th>
              <th scope="col">Em estoque</th>
              <th scope="col">Categoria</th>
              <th scope="col">Vendas</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{formatedValue.format(Number(item.price))}</td>
                <td>{item.quantity}</td>
                <td>{item.category}</td>
                <td>{item.sales}</td>
                <td>
                  <span>
                    <FiTrash
                      size={18}
                      color="#141414"
                      className={styles.btn_remove}
                      onClick={() => handleRemoveItem(item.id)}
                    />
                    <FiEdit2
                      size={18}
                      color="#141414"
                      className={styles.edit}
                      onClick={() => handleEditItem(item.id)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};
