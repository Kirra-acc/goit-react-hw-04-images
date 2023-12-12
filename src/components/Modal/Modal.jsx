import { useEffect } from 'react';
import s from './Modal.module.css';

export const Modal = ({ modalImgUrl, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div className={s.overlay} onClick={closeModal}>
      <img src={modalImgUrl} alt="modal img" className={s.modal} />
    </div>
  );
};
