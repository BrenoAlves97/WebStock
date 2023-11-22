import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth-context.jsx';

import { Container } from '../container/container.component.jsx';

export const Private = ({ children }) => {
   const { signed, loadingAuth } = React.useContext(AuthContext);

   if (loadingAuth) return <Container />;

   if (!signed) return <Navigate to="/login" />;

   return children;
};
