import React from 'react';
class City extends React.Component {
  constructor(props) {
    super(props);
    this.country = this.props.location.state.detail;
    this.state = {cities: [], success: false}
  }

  fetchPopulation = () => {
    let country = this.country.charAt(0).toUpperCase() + this.country.slice(1);
    const url = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000' +
                '&q=&rows=3&sort=population&facet=timezone&facet=country&refine.country=' + country;
    fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res.nhits > 0) {
        let cities = [];
        res.records.map((city) => {
          return cities.push(city.fields.name)
        });
        this.setState({cities : cities, success: true});
      } else {
        this.props.history.push({
          pathname: '/search-country',
          state: { detail: "Country not found. Please try again."}
        })
      }
    });
  }

  CityList = () => {
    let cities = this.state.cities;
    return cities.map((city) => (
      <div className="population">
        <p id={city.name}>{city.toUpperCase()}</p>
      </div>
    ));
  }


  componentDidMount() {
    this.setState({cities: []});
    this.fetchPopulation();
  }

  render() {
    const success = this.state.success
    let headline;
    let list;
    if (success) {
      list = this.CityList()
    } else {
      headline = <p>Loading....</p>
    }
    return (
      <main>
        <h1>CityPop</h1>
        <h4>{this.country.toUpperCase()}</h4>
        {headline}{list}
      </main>
    );
  }
}

export default City;