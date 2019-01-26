import React, { Component } from 'react';
import '../../styles/main.scss';
import Navigation from '../Navigation/Navigation';
import { FilmScroll } from '../FilmScroll/FilmScroll';
import { fetchSWData } from '../api/apicalls';
import { addHomeWorldInfo, addSpeciesInfo, selectFilm } from '../helpers/helpers';
import { Display } from '../Display/Display';
import PropTypes from 'prop-types';

class App extends Component {
  constructor() {
    super();
    this.state = {
      people: [],
      planets: [], 
      vehicles: [],
      favorites: [],
      filmToShow: '',
      category: '',
      errorStatus: ''
    }
  }

  getPeople = async () => {
    let people = [];

    try {
      const peopleInfo = await fetchSWData(`https://swapi.co/api/people/`);
      people.push(...peopleInfo.results);
      const peopleWithWorldInfo = await addHomeWorldInfo(people);
      const peopleWithSpeciesAndWorldInfo = await addSpeciesInfo(peopleWithWorldInfo);
      people = peopleWithSpeciesAndWorldInfo;
      this.setState({ people });
    } catch (error) {
      this.setState({errorStatus: error});
    }

  }

  getFilm = async () => {
    try {
      const filmToShow = await selectFilm();
      await this.setState({ filmToShow });
    } catch(error) {
      this.setState({ errorStatus: error });
    }
  }

  componentDidMount = () => {
    this.getFilm();
    this.getPeople();
  }

  updateCategory = (category) => {
    this.setState({category});
  }

  render() {
    let { favorites, category } = this.state;
    return (
      <div className="app">
        <header className="App-header">
        <h1>SWAPI BOX</h1>
        <Navigation updateCategory={this.updateCategory} favorites={favorites.length}/>
        </header>
        <main>
          { this.state.filmToShow !== '' && <FilmScroll film={this.state.filmToShow}/> }
          { this.state.category !== '' && <Display data={this.state[category]} category={category}/>}
        </main>
      </div>
    );
  }
}

Navigation.propTypes = {
  updateCategory: PropTypes.func,
  favorites: PropTypes.number
}

FilmScroll.propTypes = {
  film: PropTypes.object
}

Display.propTypes = {
  data: PropTypes.array,
  category: PropTypes.string
}

export default App;
