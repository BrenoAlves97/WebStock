import React from 'react';

export const ProductContext = React.createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = React.useState([]);

  return <ProductContext.Provider>{children}</ProductContext.Provider>;
};
