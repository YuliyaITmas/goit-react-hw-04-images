import PropTypes from 'prop-types';
import { ErrorWrap, Img } from './ErrorMessage.styled';

export const ErrorMesage = ({picture, message }) => {
  return (
    <ErrorWrap>
      <Img src={picture} alt="error" />
      <p>{message}</p>
    </ErrorWrap>
  );
};

ErrorMesage.propTypes = {
  message: PropTypes.string,
  picture: PropTypes.string,
};