import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from 'components/Modal/Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    static propTypes = {
        modalData: PropTypes.shape({
          largeImageURL: PropTypes.string.isRequired,
          tags: PropTypes.string.isRequired,
        }),
        onModalClose: PropTypes.func,
      };
    
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleBackdropeClick);
  }

  handleKeyDown = event => {
    if (event.code === `Escape`) {
      this.props.onModalClose();
    }
  };

  handleBackdropeClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onModalClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.modalData;

    return createPortal(
      <Overlay onClick={this.handleBackdropeClick}>
        <ModalContent>
          <img src={largeImageURL} alt={tags} />
        </ModalContent>
      </Overlay>,
      modalRoot
    );
  }
}


