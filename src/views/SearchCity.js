import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import UndoIcon from '@material-ui/icons/Undo';
import PropTypes from 'prop-types';

class SearchCity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    if (this.props.location.state) {
      this.message = this.props.location.state.detail
    }
    this.updateInput = this.updateInput.bind(this)
  }

  updateInput =(event) => {
    this.setState({value: event.target.value})
  }
  // after pressing search, go to city page, include city name as state value for the API call
  searchCity = (event) => {
    event.preventDefault();
    this.props.history.push({
      pathname: '/search-city/city',
      state: { detail: this.state.value}
    })
  }
  goBack = () => {
    this.props.history.push({
      pathname: '/'
    })
  }
  render() {
    const message = this.message;
    let msg;
    if (this.message !== '') {
      msg = <p>{message}</p>;
    }
    return (
      <main>
        <h1>CityPop</h1>
        <h4>SEARCH BY CITY</h4>
        {msg}
        <form onSubmit={this.searchCity}>
        <input type='text' placeholder='Enter a city' className='searchInput' onChange={this.updateInput} ></input>
        </form>
        <button id='search' onClick={this.searchCity}><SearchIcon className='search'/></button>
        <button id='search' onClick={this.goBack}><UndoIcon className='search'/></button>
      </main>
    );
  }
}

SearchCity.propTypes = {
  location: PropTypes.string,
  history: PropTypes.object,
};

export default SearchCity;