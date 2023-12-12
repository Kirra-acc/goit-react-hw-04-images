import React from 'react';
import { Hearts } from 'react-loader-spinner';
import s from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={s.loader}>
      <Hearts
        height="200"
        width="200"
        color="#ffe5b4"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
