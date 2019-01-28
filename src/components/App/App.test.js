import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import * as Helpers from '../helpers/helpers';
import * as API from '../api/apicalls';

describe('App', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match the snapshot with all data passed in', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    const expected = {
      isLoading: true,
      people: [],
      planets: [],
      vehicles: [],
      favorites: [],
      filmToShow: '',
      category: '',
      errorStatus: ''
    }
    const wrapper = shallow(<App />);
    expect(wrapper.state()).toEqual(expected);
  });
  
  describe('getData', () => {

    it('should set state with the correct category', () => {
      const wrapper = shallow(<App />);
      const mockCategory = 'vehicles';
      wrapper.instance().getData(mockCategory)
      expect(wrapper.state('category')).toEqual(mockCategory)
    });

    it.skip('should call getPeople if people is passed through as a category', () => {

    });
  });

  describe('getFilm', () => {
    let mockFilm;

    beforeEach(() => {
      mockFilm = { opening_crawl: 'Turmoil has engulfed the Galactic Republic.', title: 'The Phantom Menace', release_date: '1999-05-09' }
      Helpers.selectFilm = jest.fn(() => mockFilm);
    });

    it('should set state with a film is everything is okay with the data', async () => {
      const wrapper = shallow(<App />);
      await wrapper.instance().getFilm();
      expect(wrapper.state('filmToShow')).toEqual(mockFilm);
      expect(wrapper.state('isLoading')).toEqual(false);
    });

    it.skip('should set state with an error if everything is not okay with the data', async () => {
      const mockError = Error('Error fetching, code: 401')
      Helpers.selectFilm = jest.fn(() => {
        throw Error('Error fetching, code: 401')
      })
      const wrapper = shallow(<App />);
      await wrapper.instance().getFilm();
      expect(wrapper.state('errorStatus')).toEqual('Error fetching, code: 401')
    });
  });

  describe('getPeople', () => {

    it.skip('should set state with people if everything is okay with the data', () => {

    });
  });
  
  describe('getPlanets', () => {
    let mockPlanets = [{name: 'planet1', name: 'planet2'}]
    let mockCleanedPlanets = [{ name: 'planet1', type: 'planets'}, {name: 'planet2', type: 'planets' }]
    
    beforeEach(() => {
      API.fetchSWData = jest.fn(() => {{ results: mockPlanets }});
      Helpers.cleanPlanetData = jest.fn(() => mockCleanedPlanets);
    });

    it.skip('should set state with planets if everything is okay with the data', async () => {
      const wrapper = shallow(<App />);
      await wrapper.instance().getPlanets();
      expect(wrapper.state('planets')).toEqual(mockCleanedPlanets);      
    });
  });

  describe('getVehicle', () => {
    it.skip('should set state with vehicles is everything is okay with the data', () => {

    });
  });

  describe('handleChosenCategory', () => {
    
    it('should set state to the category passed in if there is already data in state for that category', () => {
      const wrapper = shallow(<App />);
      const mockCategory = 'people'
      wrapper.setState({people: [{name: 'han'} ]});
      wrapper.instance().handleChosenCategory(mockCategory);
      expect(wrapper.state('category')).toEqual(mockCategory);
    });

    it.skip('should call getData if there is not anything in state for the category passed throug', () => {

    });
  });

  describe('handleFavroite', () => {

    it('should add the id passed to favorites if it is not already there', () => {
      const mockId = '12B';
      const expected = [ '12B' ]
      const wrapper = shallow(<App />);
      wrapper.instance().handleFavorite(mockId);
      expect(wrapper.state('favorites')).toEqual(expected);  
    });

    it('should remove the id passed in, if the id is already there', () => {
      const mockId = '24C';
      const expected = []
      const wrapper = shallow(<App />);
      wrapper.setState({ favorites: [mockId] });
      wrapper.instance().handleFavorite(mockId);
      expect(wrapper.state('favorites')).toEqual(expected);
    });
  });
});