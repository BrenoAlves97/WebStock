import React from 'react';

import { Form } from '../../components/form/form.component.jsx';

export const Home = () => {
  return (
    <div className="w-full bg-gray-300 px-6 bg-gradient-to-r from-gray-600 via-slate-800 to-gray-900 py-6">
      <div className="w-full max-w-4xl mx-auto">
        <Form />
      </div>
    </div>
  );
};
