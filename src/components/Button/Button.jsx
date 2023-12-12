import React from 'react';
import s from './Button.module.css';

export const Button = ({ updatePage }) => {
  return (
    <div className={s.btnWrapper}>
      <button className={s.moreBtn} type="button" onClick={updatePage}>
        Load More
      </button>
    </div>
  );
};
