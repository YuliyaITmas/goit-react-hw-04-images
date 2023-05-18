import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Header, SearchForm, ButtonSearch, Input } from './Searchbar.styled';
import { BiSearchAlt2 } from 'react-icons/bi';
import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleChange = event => {
    this.setState({
      searchValue: event.currentTarget.value.toLowerCase().trim(),
    });

  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchValue.trim() === '') {
      toast.error("Input anything");
      return;
    }
    this.props.onSubmit(this.state.searchValue.trim());
    this.setState({ searchValue: '' });
  };
  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <ButtonSearch type="submit" aria-label="Search">
            <BiSearchAlt2 size="26" />
          </ButtonSearch>

          <Input
            value={this.state.searchValue}
            onChange={this.handleChange}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
