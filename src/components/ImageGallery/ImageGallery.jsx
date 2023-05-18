import { Component } from 'react';
import PropTypes from 'prop-types';
import { api } from 'components/services/getImages';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';

import { Loader } from 'components/Loader/Loader';
import { ErrorMesage } from 'components/ErrorMessage/ErrorMessage';
import { InitialGallery } from 'components/InitialGallery/InitialGallery';
import errorImage from 'components/mistake.jpeg';
import notFoundImage from 'components/magnifying.jpeg';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageGallery extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  state = {
    query: '',
    images: [],
    error: null,
    status: Status.IDLE,
    page: 1,
    totalPages: 0,

    isShowModal: false,
    modalData: { img: '', tags: '' },
  };
  static getStateFromProps(nextProps, prevState) {
    if (prevState.value !== nextProps.value) {
      return { page: 1, query: nextProps.value };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevName = prevProps.value;
    const nextName = this.props.value;
    if (prevName !== nextName) {
      this.setState({
        status: Status.PENDING,
        images: [],
        page: 1,
      });

      api
        .getImages(nextName, page)
        .then(images => {
          this.setState(prevState => ({
            images:
              page === 1 ? images.hits : [...prevState.images, ...images.hits],
            query: nextName,

            status: Status.RESOLVED,
            totalPages: Math.floor(images.totalHits / 12),
          }));
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  handleLoadMore = event => {
    event.preventDefault();
    

    const { value: query } = this.props;
    this.setState(
      prevState => ({ page: prevState.page + 1, query }),
      () => {
        api
          .getImages(query, this.state.page)
          .then(images => {
            this.setState(prevState => ({
              images: [...prevState.images, ...images.hits],
              status: Status.RESOLVED,
              totalPages: Math.floor(images.totalHits / 12),
            }));
          })
          .catch(error => this.setState({ error, status: Status.REJECTED }));
      }
    );
  };

  setModalData = modalData => {
    this.setState({ modalData, isShowModal: true });
  };

  handleModalClose = () => {
    this.setState({ isShowModal: false });
  };
  render() {
    const { images, error, status, page, totalPages, isShowModal, modalData } =
      this.state;
    if (status === 'idle') {
      return <InitialGallery message="Let's find some pictures..." />;
    }
    if (status === 'pending') {
      return <Loader>Pictures are loading...</Loader>;
    }
    if (status === 'rejected') {
      return <ErrorMesage picture={errorImage} message={error.message} />;
    }
    if (images.length === 0) {
      return (
        <ErrorMesage
          picture={notFoundImage}
          message={`Sorry, we couldn't find ${this.props.value}`}
        />
      );
    }
    if (status === 'resolved') {
      return (
        <>
          <List>
            {images.map(({ id, webformatURL, tags, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  tags={tags}
                  largeImageURL={largeImageURL}
                  handleClick={this.setModalData}
                />
              );
            })}
          </List>

          {images.length > 0 && status !== 'pending' && page <= totalPages && (
            <Button onClick={this.handleLoadMore}>Load More</Button>
          )}
          {isShowModal && (
            <Modal modalData={modalData} onModalClose={this.handleModalClose} />
          )}
        </>
      );
    }
  }
}
