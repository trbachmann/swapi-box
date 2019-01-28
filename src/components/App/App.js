import React, { Component } from 'react';
import '../../main.scss';
import Navigation from '../Navigation/Navigation';
import { FilmScroll } from '../FilmScroll/FilmScroll';
import { fetchSWData } from '../api/apicalls';
import * as Helpers from '../helpers/helpers';
import { Display } from '../Display/Display';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      people: [],
      planets: [], 
      vehicles: [],
      favorites: [],
      filmToShow: '',
      category: '',
      errorStatus: ''
    }
  }

  componentDidMount = () => {
    this.getFilm();
  }

  getData = (category) => {
    switch (category) {
      case 'people':
        this.getPeople();
        break;
      case 'planets':
        this.getPlanets();
        break;
      case 'vehicles':
        this.getVehicles();
        break;
      default:
        this.setState({ category: '' });
    }
    this.setState({ category, isLoading: false });
  }
  
  getFilm = async () => {
    try {
      const filmToShow = await Helpers.selectFilm();
      await this.setState({ filmToShow, isLoading: false });
    } catch (error) {
      this.setState({ errorStatus: error });
    }
  }

  getPeople = async () => {
    try {
      let people = [];
      const peopleInfo = await fetchSWData(`https://swapi.co/api/people/`);
      people = Helpers.cleanPeopleData(peopleInfo.results);
      const peopleWithWorldInfo = await Helpers.addHomeWorldInfo(people);
      const peopleWithSpeciesAndWorldInfo = await Helpers.addSpeciesInfo(peopleWithWorldInfo);
      people = peopleWithSpeciesAndWorldInfo;
      this.setState({ people });
    } catch (error) {
      this.setState({ errorStatus: error });
    }

  }

  getPlanets = async () => {
    try {
      const planetData = await fetchSWData('https://swapi.co/api/planets');
      const cleanPlanets = await Helpers.cleanPlanetData(planetData.results);
      this.setState({ planets: cleanPlanets})
    } catch (error) {
      this.setState({ errorStatus: error })
    }
  }

  getVehicles = async () => {
    try {
      const vehicleData = await fetchSWData('https://swapi.co/api/vehicles');
      const vehicles = await Helpers.cleanVehicleData(vehicleData.results);
      this.setState({ vehicles });
    } catch (error) {
      this.setState({ errorStatus: error });
    }
  }

  handleChosenCategory = (category) => {
    if (this.state[category].length > 0) {
      this.setState({ category });
    } else {
      this.setState({isLoading: true})
      this.getData(category);
    }
  }

  handleFavorite = (id) => {
    let favorites;
    if (this.state.favorites.length === 0) {
      favorites = [id];
    } else if (this.state.favorites.includes(id)) {
      favorites = this.state.favorites.filter( favorite => {
        return favorite !== id
      });
    } else {
      favorites = [...this.state.favorites, id];
    }
    this.setState({ favorites })
  }

  render() {
    let { favorites, category } = this.state;
    return (
      <div className="app">
        <header className="App-header">
        <h1>SWAPI BOX</h1>
        <Navigation handleChosenCategory={this.handleChosenCategory} favorites={favorites.length}/>
        </header>
        <main>
          { this.state.filmToShow !== '' && <FilmScroll film={this.state.filmToShow}/> }
          { this.state.isLoading && <ReactLoading className='loader' type={'cylon'} color={'#FFE300'} height={'20%'} width={'30%'} /> }
          { this.state.category !== '' && <Display data={this.state[category]} favorites={favorites} handleFavorite={this.handleFavorite}/> }
        </main>
      </div>
    );
  }
}

Navigation.propTypes = {
  handleChosenCategory: PropTypes.func,
  favorites: PropTypes.number
}

FilmScroll.propTypes = {
  film: PropTypes.object
}

Display.propTypes = {
  data: PropTypes.array,
  favorites: PropTypes.array,
  handleFavorite: PropTypes.func
}

export default App;
