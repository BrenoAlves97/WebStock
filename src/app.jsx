import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import { Home } from './pages/home/home.page.jsx';
import { Products } from './pages/products/products.page.jsx';

import { Header } from './components/header/header.component.jsx';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            className: '',
            style: {
              border: '1px solid #092551',
              padding: '4px',
              color: '#092551',
              fontSize: '12px',
            },
          }}
        />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estoque" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
