import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BsFillXCircleFill } from 'react-icons/bs';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, largeImage, description }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleClickBackdrop}>
      <div className={css.modal}>
        <button className={css.button} type="button" onClick={onClose}>
          <BsFillXCircleFill />
        </button>
        <img src={largeImage} alt={description} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClick: PropTypes.func,
  largeImage: PropTypes.string,
  description: PropTypes.string,
};

export default Modal;
