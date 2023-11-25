import React from 'react';

export const ChangeTitle = ({ title }) => {
   React.useEffect(() => {
      document.title = `Estoque Web |  ${title}`;

      return () => (document.title = `Estoque Web `);
   }, [title]);

   return null;
};
