import { Circles } from 'react-loader-spinner';
import { LoaderWrap } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrap>
      <Circles
        height="160"
        width="160"
        color="#b749b7"
        ariaLabel="circles-loading"
        visible={true}
      />
    </LoaderWrap>
  );
};
