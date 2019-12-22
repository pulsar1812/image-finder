import React, { Component } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@material-ui/core';
import axios from 'axios';

import { PIXABAY_API_KEY } from '../../config/keys';
import ImageResults from '../image-results/ImageResults';

class Search extends Component {
  state = {
    searchText: '',
    amount: 30,
    apiUrl: 'https://pixabay.com/api',
    apiKey: PIXABAY_API_KEY,
    images: []
  };

  onTextChange = e => {
    const val = e.target.value;

    this.setState({ [e.target.name]: val }, () => {
      if (val === '') {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then(res => this.setState({ images: res.data.hits }))
          .catch(err => console.log(err));
      }
    });
  };

  // onAmountChange = (e, index, value) => this.setState({ amount: value });

  onAmountChange = event => {
    this.setState({ amount: event.target.value });
  };

  render() {
    const { searchText, amount, images } = this.state;

    return (
      <div>
        <TextField
          name='searchText'
          value={searchText}
          onChange={this.onTextChange}
          label='Search For Images'
          fullWidth={true}
        />
        <br />
        <FormControl>
          <InputLabel htmlFor='name-disabled'>Amount</InputLabel>
          <Select name='amount' value={amount} onChange={this.onAmountChange}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <br />
        {images.length > 0 ? <ImageResults images={images} /> : null}
      </div>
    );
  }
}

export default Search;
