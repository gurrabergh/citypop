import React from 'react';

class City extends React.Component {
  constructor(props) {
    super(props);
    this.city = this.props.location.state.detail;
  }
  render() {
    return (
      <main>
        <h1>CityPop</h1>
        <h4>{this.city.toUpperCase()}</h4>
      </main>
    );
  }
}

export default City;