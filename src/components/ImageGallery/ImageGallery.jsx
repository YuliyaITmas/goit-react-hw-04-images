import { useState, useEffect } from 'react';
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

export const ImageGallery = ({ value }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalData, setModalData] = useState({ img: '', tags: '' });

  
  useEffect(() => {
    if (!value) return;

    if (query !== value) {
      setStatus(Status.PENDING);
      setImages([]);
      setPage(1);
    }
    api
      .getImages(value, page)
      .then(imagesData => {
        setImages(images =>
          page === 1 ? imagesData.hits : [...images, ...imagesData.hits]
        );
        setQuery(value);
        setStatus(Status.RESOLVED);
        setTotalPages(Math.floor(imagesData.totalHits / 12));
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [value, query, page]);

  const handleLoadMore = event => {
    event.preventDefault();
    setPage(page => page + 1);
  };

  const openModalData = modalData => {
    setModalData(modalData);
    setIsShowModal(true);
  };

  const handleModalClose = () => {
    setIsShowModal(false);
  };

  if (status === Status.IDLE) {
    return <InitialGallery message="Let's find some pictures..." />;
  }
  if (status === Status.PENDING) {
    return <Loader>Pictures are loading...</Loader>;
  }
  if (status === Status.REJECTED) {
    return <ErrorMesage picture={errorImage} message={error.message} />;
  }
  if (images.length === 0) {
    return (
      <ErrorMesage
        picture={notFoundImage}
        message={`Sorry, we couldn't find ${value}`}
      />
    );
  }
  if (status === Status.RESOLVED) {
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
                handleClick={openModalData}
              />
            );
          })}
        </List>

        {images.length > 0 &&
          status !== Status.PENDING &&
          page <= totalPages && (
            <Button onClick={handleLoadMore}>Load More</Button>
          )}
        {isShowModal && (
          <Modal modalData={modalData} onModalClose={handleModalClose} />
        )}
      </>
    );
  }
};

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
};
