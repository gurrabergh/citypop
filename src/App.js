import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {Start, City, Country, SearchCity, SearchCountry}  from './views';

import './App.css';

const App = () => (
  <Router>
    <div className='App'>
      <Route exact path='/' component={Start} />
      <Route exact path='/search-country' component={SearchCountry} />
      <Route exact path='/search-city' component={SearchCity} />
      <Route path='/search-city/city' component={City} />
      <Route path='/search-country/country' component={Country} />
    </div>
  </Router>
);

export default App;
