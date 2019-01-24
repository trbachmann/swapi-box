import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      films: [],
      people: [],
      planets: [],
      vehicles: [],
      favorites: []
    }
  }

  componentDidMount = async () => {
    const url = 'https://swapi.co/api/films';
    const response = await fetch(url)
    const result = await response.json();
    const films = await result.results;
    this.setState({films});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>SWAPI BOX</h1>
        </header>
      </div>
    );
  }
}

export default App;
