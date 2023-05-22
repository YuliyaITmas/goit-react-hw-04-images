import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Container } from './App.styled';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Container>
      <Searchbar onSubmit={setSearchValue} />
      <ImageGallery value={searchValue} />
      <ToastContainer autoClose={3000} />
    </Container>
  );
};
