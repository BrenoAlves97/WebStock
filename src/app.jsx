import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/home/home.page.jsx';
import { Products } from './pages/products/products.page.jsx';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estoque" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
