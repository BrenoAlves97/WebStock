import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDZqx_pnk99CZoxpfgzGpEWumINXx2XZJc',
  authDomain: 'estoque-web-59cac.firebaseapp.com',
  projectId: 'estoque-web-59cac',
  storageBucket: 'estoque-web-59cac.appspot.com',
  messagingSenderId: '305741118371',
  appId: '1:305741118371:web:b00d93b7489a802f91f816',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
