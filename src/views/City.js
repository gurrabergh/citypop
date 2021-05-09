import React from 'react';
import user from '../user.js';
import UndoIcon from '@material-ui/icons/Undo';
import SyncLoader from "react-spinners/SyncLoader";
import PropTypes from 'prop-types';

class City extends React.Component {
  constructor(props) {
    super(props);
    this.city = this.props.location.state.detail;
    this.state = {population: null, success: false}
  }

  // fetch the city's population 
  fetchPopulation = () => {
    const url = 'http://api.geonames.org/searchJSON?name_equals=' + this.city + 
                '&orderby=relevance&username=' +  user + '&maxRows=1';
    fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res.totalResultsCount > 0 && res.geonames[0].population !== 0) { // if API returns a hit with a valid population then format the number and set the population
        this.setState({
          population: res.geonames[0].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
          success: true});
      } else { // if not valid response from API then go back to search page and display error msg
        this.props.history.push({
          pathname: '/search-city',
          state: { detail: 'No city found. Please try again.'}
        })
      }
    }).catch(error => { // if connection issue with the api then go back to search page and display msg
      this.props.history.push({
        pathname: '/search-city',
        state: { detail: 'Network error. Please try again.'}
      })
    });
  }

  goBack = () => {
    this.props.history.push({
      pathname: '/search-city'
    })
  }

  componentDidMount() {
    this.setState({population: null});
    this.fetchPopulation();
  }

  render() {
    const fetchSuccess = this.state.success
    let headline;
    if (fetchSuccess) { // displays loading symbol/message until data is loaded
      headline = <div className='population'>Population
      <h2>{this.state.population}</h2></div>
    } else {
      headline = <div><p>Loading...</p><SyncLoader/></div>
    }
    return (
      <main>
        <h1>CityPop</h1>
        <h4>{this.city.toUpperCase()}</h4>
        {headline}
        <button id='search' onClick={this.goBack}><UndoIcon className='search'/></button>
      </main>
    );
  }
}

City.propTypes = {
  location: PropTypes.string,
  history: PropTypes.object,
};

export default City;