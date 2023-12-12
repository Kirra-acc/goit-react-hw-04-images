import React from 'react';
import s from './Searchbar.module.css';
import { MdOutlineSavedSearch } from 'react-icons/md';

export const Searchbar = ({ onSubmit }) => {
  return (
    <>
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={onSubmit}>
          <button type="submit" className={s.button}>
            <MdOutlineSavedSearch size={35} />
          </button>

          <input
            name="input"
            className={s.input}
            type="text"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
};
