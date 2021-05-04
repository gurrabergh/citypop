import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

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

  searchCountry = (event) => {
    event.preventDefault();
    this.props.history.push({
      pathname: '/search-country/country',
      state: { detail: this.state.value}
    })
  }

  render() {
    const message = this.message;
    let msg;
    if (this.message !== "") {
      msg = <p>{message}</p>;
    }
    return (
      <main>
        <h1>CityPop</h1>
        <h4>SEARCH BY COUNTRY</h4>
        {msg}
        <form onSubmit={this.searchCountry}>
        <input type="text" placeholder="Enter a country" className="searchInput" onChange={this.updateInput}></input>
        </form>
        <button id="search" onClick={this.searchCountry}><SearchIcon className="search"/></button>
      </main>
    );
  }
}

export default SearchCountry;