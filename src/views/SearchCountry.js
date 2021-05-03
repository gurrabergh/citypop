import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

class SearchCountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.updateInput = this.updateInput.bind(this)
  }

  updateInput(event) {
    this.setState({value: event.target.value})
  }

  searchCountry = (event) => {
    event.preventDefault();
    this.props.history.push({
      pathname: '/search-country/country',
      state: { detail: this.state.value}
    })
  }

  render() {
    return (
      <main>
        <h1>CityPop</h1>
        <h4>SEARCH BY COUNTRY</h4>
        <form onSubmit={this.searchCountry}>
        <input type="text" placeholder="Enter a city" className="searchInput" onChange={this.updateInput}></input>
        </form>
        <button id="search" onClick={this.searchCountry}><SearchIcon className="search"/></button>
      </main>
    );
  }
}

export default SearchCountry;