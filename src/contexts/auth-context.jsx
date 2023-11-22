import React from 'react';

import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.app.js';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = React.useState({});
   const [loadingAuth, setLoadingAuth] = React.useState(true);

   React.useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
         if (user) {
            setUser({
               email: user.email,
               displayName: user.displayName,
               uid: user.uid,
            });
            setLoadingAuth(false);
         } else {
            setUser(null);
            setLoadingAuth(false);
         }
      });

      return () => unsub();
   }, []);

   return <AuthContext.Provider value={{ user, signed: !!user, loadingAuth }}>{children}</AuthContext.Provider>;
};
