import React from 'react';
import s from './Modal.module.css';

export class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { modalImgUrl, closeModal } = this.props;
    return (
      <div className={s.overlay} onClick={closeModal}>
        <img src={modalImgUrl} alt="modal img" className={s.modal} />
      </div>
    );
  }
}
