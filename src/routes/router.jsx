import { createBrowserRouter } from 'react-router-dom';

import { Private } from '../components/private/private.component.jsx';

import { Home } from '../pages/home/home.page.jsx';
import { Products } from '../pages/products/products.page.jsx';
import { Edit } from '../pages/edit/edit.page.jsx';
import { Detail } from '../pages/detail/detail.page.jsx';
import { Login } from '../pages/login/login.page.jsx';
import { Layout } from '../components/layout/layout.component.jsx';

export const router = createBrowserRouter([
   {
      element: <Layout />,
      children: [
         {
            path: '/',
            element: (
               <Private>
                  <Home />
               </Private>
            ),
         },
         {
            path: '/estoque',
            element: (
               <Private>
                  <Products />
               </Private>
            ),
         },
         {
            path: '/editar/:id',
            element: (
               <Private>
                  <Edit />
               </Private>
            ),
         },
         {
            path: '/detalhes/:id',
            element: (
               <Private>
                  <Detail />
               </Private>
            ),
         },
      ],
   },
   {
      path: '/login',
      element: <Login />,
   },
]);
