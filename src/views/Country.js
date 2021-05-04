import React from 'react';
import UndoIcon from '@material-ui/icons/Undo';
import SyncLoader from 'react-spinners/SyncLoader';

class City extends React.Component {
  constructor(props) {
    super(props);
    this.country = this.props.location.state.detail.toLowerCase();
    this.state = {cities: [], success: false}
  }
  //fetch top 3 cities by population from searched country
  fetchPopulation = () => {
    let country = this.formatCountry();
    const url = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000' +
                '&q=&rows=3&sort=population&facet=timezone&facet=country&refine.country=' + country;
    fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res.nhits > 0) { // check that API returns at least one hit
        let cities = [];
        res.records.map((city) => {
          return cities.push(city.fields.name)
        });
        this.setState({cities : cities, success: true});
      } else {
        this.props.history.push({ // if not a valid respone by API, go back to search page and let user know
          pathname: '/search-country',
          state: { detail: 'Country not found. Please try again.'}
        })
      }
    }).catch(error => { // catch any error from API, let user know
      this.props.history.push({
        pathname: '/search-city',
        state: { detail: 'Network error. Please try again.'}
      })
    });
  }
  // loop through cities to create divs to display them
  CityList = () => {
    let cities = this.state.cities;
    return cities.map((city) => (
      <div key={city} id={city} className='cities' onClick={this.goToCity}>
        <p id={city}>{city.toUpperCase()}</p>
      </div>
    ));
  }
  // go to population page for clicked city
  goToCity = (event) => {
    this.props.history.push({
      pathname: '/search-city/city',
      state: {detail: event.target.getAttribute('id')}
    })
  }

  //format country input to work with api eg: united states => United States
  formatCountry = () => {
    let countryList = this.country.split(' ');
    let countryString = '';
    countryList.forEach(part => {
      part.toLowerCase();
      part = part.charAt(0).toUpperCase() + part.slice(1);
      countryString += part + " ";
    });
    return countryString.slice(0, -1);
  }

  goBack = () => {
    this.props.history.push({
      pathname: '/',
      state: { detail: ''}
    })
  }

  componentDidMount() {
    this.setState({cities: []});
    this.fetchPopulation();
  }

  render() {
    const fetchSuccess = this.state.success
    let headline;
    let list;
    if (fetchSuccess) { // displays loading symbol/message until data is loaded
      list = this.CityList()
    } else {
      headline = <div><p>Loading...</p><SyncLoader/></div>
    }
    return (
      <main>
        <h1>CityPop</h1>
        <h4>{this.country.toUpperCase()}</h4>
        {headline}{list}
        <button id='search' onClick={this.goBack}><UndoIcon className='search'/></button>
      </main>
    );
  }
}

export default City;