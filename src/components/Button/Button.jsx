import PropTypes from 'prop-types';
import { LoadMore } from './Button.styled';

export const Button = ({ onClick, children }) => {
  return (
    <LoadMore type="button" onClick={onClick}>
      {children}
    </LoadMore>
  );
};

LoadMore.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
};
