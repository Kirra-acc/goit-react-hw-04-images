import React from 'react';
import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  openModal,
}) => {
  return (
    <>
      <li className={s.galleryItem}>
        <img
          className={s.galleryImg}
          src={webformatURL}
          alt="chosen"
          id={id}
          onClick={() => openModal(largeImageURL)}
        />
      </li>
    </>
  );
};
