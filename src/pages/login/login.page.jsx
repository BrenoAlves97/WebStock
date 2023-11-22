import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.app.js';

import { Container } from '../../components/container/container.component.jsx';
import { CustomInput } from '../../components/form/custom-input/custom-input.component.jsx';
import { CustomButton } from '../../components/form/custom-button/custom-button.component.jsx';

export const Login = () => {
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');
   const [loading, setLoading] = React.useState(false);

   const [showPassword, setShowPassword] = React.useState(false);

   const navigate = useNavigate();

   const handleSubmitPress = async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
         await signInWithEmailAndPassword(auth, email, password).then(() => {
            setLoading(false);
            navigate('/estoque', { replace: true });
            return toast.success("Bem-vindo novamente! :D")
         });
      } catch (error) {
         console.log(error);
         return toast.error('Houve algum erro...');
      }
   };

   return (
      <Container>
         <div className="w-full max-w-2xl mx-auto">
            <div className="w-full flex flex-col gap-4 justify-center items-center">
               <h2 className="text-3xl md:text-4xl text-white font-bold text-center">Acesse sua conta</h2>
               <form onSubmit={handleSubmitPress} className="w-full flex flex-col">
                  <CustomInput placeholder="email@teste.com" type="email" value={email} setValue={setEmail} />
                  <div className="relative w-full flex items-center ">
                     <CustomInput
                        placeholder="*********"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        setValue={setPassword}
                     />
                     <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute p-2 right-1 top-1 ml-4 cursor-pointer"
                     >
                        {!showPassword && password.length > 0 && <FiEye color="#141414" size={18} />}
                        {showPassword && password.length > 0 && <FiEyeOff color="#141414" size={18} />}
                     </span>
                  </div>
                  <CustomButton>
                     {loading ? (
                        <ClipLoader size={18} color="#141414" />
                     ) : (
                        <>
                           <span>Entrar</span>
                           <FiLogIn size={18} color="#141414" className="ml-2" />
                        </>
                     )}
                  </CustomButton>
               </form>
            </div>
         </div>
      </Container>
   );
};
