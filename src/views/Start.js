import React from 'react';
import {Link} from 'react-router-dom'
class Start extends React.Component {
  render () {
    return (
      <main>
        <h1>CityPop</h1>
        <div className="start">
        <Link to='/search-city' ><button className='start-button'>SEARCH BY CITY</button></Link>
        <Link to='/search-country'><button className='start-button'>SEARCH BY COUNTRY</button></Link>
        </div>
      </main>
    );
  }
}

export default Start;