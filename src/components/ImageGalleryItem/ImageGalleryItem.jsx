import PropTypes from 'prop-types';
import { Item, Picture } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  handleClick,
}) => {
  return (
    <Item
      onClick={event => {
        event.preventDefault();
        handleClick({ largeImageURL, tags });
      }}
    >
      <div>
        <Picture src={webformatURL} alt={tags} />
      </div>
    </Item>
  );
};
ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
