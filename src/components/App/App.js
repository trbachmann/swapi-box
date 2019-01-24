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
      favorites: [],
      filmToShow: ''
    }
  }

  fetchPeople = async () => {
    let people = [];

    for (let i = 1; i < 10; i++) {
      try {
        const response = await fetch(`https://swapi.co/api/people/?page=${i}`);
        const result = await response.json();
        people.push(...result.results)
      } catch (error) {
        console.log(error);
      }
    }

    const peopleWithWorldInfo = await this.fetchWorldInfo(people);
    const peopleWithSpeciesAndWorldInfo = await this.fetchSpeciesInfo(peopleWithWorldInfo);
    this.setState({ people: peopleWithSpeciesAndWorldInfo});
  }

  fetchWorldInfo = (peopleArray) => {
    const unresolvedPromises = peopleArray.map(async (person) => {
      const response = await fetch(person.homeworld);
      const result = await response.json();
      return {
        ...person,
        homeworld: result.name,
        population: result.population
      }
    });
    return Promise.all(unresolvedPromises)
  }

  fetchSpeciesInfo = (peopleArray) => {
    const unresolvedPromises = peopleArray.map(async (person) => {
      if (person.species.length > 0) {
        const response = await fetch(person.species);
        const result = await response.json();
        return ({ ...person, species: result.name })
      } else {
        return ({
          ...person,
          species: 'unknown'
        })
      }
    });
    return Promise.all(unresolvedPromises)
  }

  pickRandomFilm = (filmArray) => {
    let index = Math.floor((Math.random() * filmArray.length));
    return filmArray[index];
  }

  componentDidMount = async () => {
    const url = 'https://swapi.co/api/films';
    const response = await fetch(url)
    const result = await response.json();
    const films = await result.results;
    const filmToShow = await this.pickRandomFilm(films);
    this.setState({films, filmToShow});
    this.fetchPeople();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>SWAPI BOX</h1>
        </header>
        <p>{this.state.filmToShow.opening_crawl}</p>
      </div>
    );
  }
}

export default App;
