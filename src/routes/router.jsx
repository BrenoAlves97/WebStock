import { createBrowserRouter } from 'react-router-dom';

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
        element: <Home />,
      },
      {
        path: '/estoque',
        element: <Products />,
      },
      {
        path: '/editar/:id',
        element: <Edit />,
      },
      {
        path: '/detalhes/:id',
        element: <Detail />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
