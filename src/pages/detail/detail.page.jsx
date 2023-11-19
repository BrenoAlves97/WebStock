import React from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Swiper, SwiperSlide } from 'swiper/react';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.app';

export const Detail = () => {
  const [loading, setLoading] = React.useState(false);
  const [product, setProduct] = React.useState(null);
  const [arrImages, setArrImages] = React.useState([]);
  const [slidesView, setSlidesView] = React.useState(2);

  const { id } = useParams();

  React.useEffect(() => {
    const handleSizeWindow = () => {
      if (window.innerWidth < 640) {
        setSlidesView(1);
      } else {
        setSlidesView(2);
      }
    };

    handleSizeWindow();

    window.addEventListener('resize', handleSizeWindow);

    () => window.removeEventListener('resize', handleSizeWindow);
  }, []);

  React.useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      const docRef = doc(db, '@products', id);
      await getDoc(docRef)
        .then((snapshot) => {
          setProduct({
            productId: snapshot.id,
            name: snapshot.data().name,
            created: snapshot.data.created,
            images: snapshot.data().images,
            price: snapshot.data().price,
            quantity: snapshot.data().quantity,
            sales: snapshot.data().sales,
            description: snapshot.data().description,
            category: snapshot.data().category,
          });
          setArrImages(snapshot.data().images);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setProduct(null);
          setArrImages([]);
          setLoading(false);
        });
    };

    fetchProduct();
  }, [id]);

  const handleLoadImage = (image) => {
    setArrImages((prevState) => [...prevState, image.url]);
  };

  const formatedValue = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  if (loading)
    return (
      <div className="w-full bg-gray-300 px-6 bg-gradient-to-r from-gray-600 via-slate-800 to-gray-900 py-6 flex-1">
        <h2 className="font-medium text-xl sm:text-2xl text-white max-w-4xl w-full mx-auto text-center">
          Buscando produto...
        </h2>
      </div>
    );

  return (
    <div className="w-full bg-gray-300 px-6 bg-gradient-to-r from-gray-600 via-slate-800 to-gray-900 py-6 flex-1">
      <div className="w-full max-w-4xl mx-auto">
        <div className="w-full flex">
          <Swiper slidesPerView={slidesView} pagination={{ clickable: true }} navigation>
            {product &&
              product.images.length > 0 &&
              product.images.map((image) => (
                <div key={image.id} className="flex-1 flex">
                  <SwiperSlide key={image.id}>
                    <div
                      style={{ display: !arrImages.includes(image.url) ? 'flex' : 'none' }}
                      className="w-full h-72 rounded-sm bg-gray-400 flex items-center justify-center"
                    >
                      <ClipLoader size={32} color="#141414" />
                    </div>
                    <img
                      onLoad={() => handleLoadImage(image)}
                      style={{ display: arrImages.includes(image.url) ? 'flex' : 'none' }}
                      src={image.url}
                      className="w-full h-72 rounded-sm object-cover object-center"
                      alt={image.id}
                    />
                  </SwiperSlide>
                </div>
              ))}
          </Swiper>
        </div>

        {product && (
          <div className="mt-8">
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center">{product.name}</h2>

            <div className="flex flex-col mt-8 mb-6 gap-2 font-mono">
              <h3 className="text-gray-200 font-medium text-xl text-center">Descrição do produto:</h3>
              <p className="font-medium text-white py-2  text-center sm:text-left">{`"${product.description}"`}</p>
            </div>

            <div className="grid grid-cols-1  sm:grid-cols-2  gap-2 text-gray-50 font-mono font-bold">
              <p className="sm:text-left text-center">Preço do produto: {formatedValue.format(product.price)}</p>
              <p className="sm:text-right text-center">Quantidade em Estoque: {product.quantity}</p>
              <p className="sm:text-left text-center">Categoria do produto: {product.category}</p>
              <p className="sm:text-right text-center">Vendas realizadas: {product.sales}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
