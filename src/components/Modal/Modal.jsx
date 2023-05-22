import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from 'components/Modal/Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ modalData, onModalClose }) => {
  const { largeImageURL, tags } = modalData;

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onModalClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onModalClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalContent>
        <img src={largeImageURL} alt={tags} />
      </ModalContent>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  modalData: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onModalClose: PropTypes.func,
};
