import { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Container } from './App.styled';

export class App extends Component {
  state = {
    searchValue: ' ',
  };

  handleFormSubmit = searchValue => {
    this.setState({ searchValue });
  };
  render() {
    return (
      <Container>
        
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery value={this.state.searchValue} />
        <ToastContainer autoClose={3000} />

      </Container>
    );
  }
}
