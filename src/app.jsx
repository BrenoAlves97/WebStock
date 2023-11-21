import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { router } from './routes/router.jsx';

export const App = () => {
  return (
    <>
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
      <RouterProvider router={router} />
    </>
  );
};
