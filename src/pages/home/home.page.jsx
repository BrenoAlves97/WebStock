import React from 'react';

import { Container } from '../../components/container/container.component.jsx';
import { Form } from '../../components/form/form.component.jsx';
import { ChangeTitle } from '../../components/change-title-page/change-title.component.jsx';

export const Home = () => {
   return (
      <>
         <ChangeTitle title="Adicionar" />
         <Container>
            <div className="w-full max-w-4xl mx-auto">
               <Form />
            </div>
         </Container>
      </>
   );
};
