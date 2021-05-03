import React from 'react';

class Country extends React.Component {
  constructor(props) {
    super(props);
    this.country = this.props.location.state.detail;
  }
  render() {
    return (
      <main>
        <h1>CountryPop</h1>
        <h4>{this.country.toUpperCase()}</h4>
      </main>
    );
  }
}

export default Country;