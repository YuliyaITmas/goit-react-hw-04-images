import PropTypes from 'prop-types';
import girl from 'components/girl.jpeg';
import { Wrap, InitPicture } from './InitialGallery.styled.jsx';

export const InitialGallery = ({ message }) => {
  return (
    <Wrap>
      <InitPicture src={girl} alt="picture" />
      <p>{message}</p>
    </Wrap>
  );
};

InitialGallery.propTypes = {
  message: PropTypes.string,
};
