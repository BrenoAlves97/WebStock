import { Outlet } from 'react-router-dom';

import { Header } from '../header/header.component.jsx';
import { Footer } from '../footer/footer.component.jsx';

export const Layout = () => {
   return (
      <>
         <Header />
         <Outlet />
         <Footer />
      </>
   );
};
