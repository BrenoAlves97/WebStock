import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth-context.jsx';

export const Private = ({ children }) => {
   const { signed, loadingAuth } = React.useContext(AuthContext);

   if (loadingAuth) return <div></div>;

   if (!signed) return <Navigate to="/login" />;

   return children;
};
