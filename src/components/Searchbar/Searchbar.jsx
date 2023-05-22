import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Header, SearchForm, ButtonSearch, Input } from './Searchbar.styled';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = event => {
    setSearchValue(event.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchValue.trim() === '') {
      toast.error('Input anything');
      return;
    }
    onSubmit(searchValue.trim());
    setSearchValue('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <ButtonSearch type="submit" aria-label="Search">
          <BiSearchAlt2 size="26" />
        </ButtonSearch>

        <Input
          value={searchValue}
          onChange={handleChange}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
