import React from 'react';
import user from '../user.js';

class City extends React.Component {
  constructor(props) {
    super(props);
    this.city = this.props.location.state.detail;
    this.state = {population: null, success: false}
  }

  fetchPopulation = () => {
    const url = 'http://api.geonames.org/searchJSON?name_equals=' + this.city + 
                '&orderby=relevance&username=' +  user + '&maxRows=1';
    fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res.totalResultsCount > 0 && res.geonames[0].population !== 0) {
        this.setState({
          population: res.geonames[0].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
          success: true});
      } else {
        this.props.history.push({
          pathname: '/search-city',
          state: { detail: "No city found. Please try again."}
        })
      }
    }).catch(TypeError => {
      this.props.history.push({
        pathname: '/search-city',
        state: { detail: "Network error. Please try again."}
      })
    });
  }

  componentDidMount() {
    this.setState({population: null});
    this.fetchPopulation();
  }

  render() {
    const success = this.state.success
    let headline;
    if (success) {
      headline = <p>Population:</p>
    } else {
      headline = <p>Loading...</p>
    }
    return (
      <main>
        <h1>CityPop</h1>
        <h4>{this.city.toUpperCase()}</h4>
        <div className="population">{headline}
        <h2>{this.state.population}</h2></div>
      </main>
    );
  }
}

export default City;