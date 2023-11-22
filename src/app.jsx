import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './contexts/auth-context.jsx';

import { router } from './routes/router.jsx';

export const App = () => {
   return (
      <>
         <AuthProvider>
            <Toaster
               position="bottom-right"
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
         </AuthProvider>
      </>
   );
};
