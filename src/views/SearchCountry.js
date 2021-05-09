import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import UndoIcon from '@material-ui/icons/Undo';

class SearchCountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    if (this.props.location.state) {
      this.message = this.props.location.state.detail
    }
    this.updateInput = this.updateInput.bind(this)
  }

  updateInput(event) {
    this.setState({value: event.target.value})
  }
  //after search, go to country page, include country name as state value for the API call
  searchCountry = (event) => {
    event.preventDefault();
    this.props.history.push({
      pathname: '/search-country/country',
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
        <h4>SEARCH BY COUNTRY</h4>
        {msg}
        <form onSubmit={this.searchCountry}>
        <input type='text' placeholder='Enter a country' className='searchInput' onChange={this.updateInput}></input>
        </form>
        <button id='search' onClick={this.searchCountry}><SearchIcon className='search'/></button>
        <button id='search' onClick={this.goBack}><UndoIcon className='search'/></button>
      </main>
    );
  }
}

SearchCountry.propTypes = {
  location: PropTypes.string,
  history: PropTypes.object,
};

export default SearchCountry;