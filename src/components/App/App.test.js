import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should match the snapshot with all data passed in', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});

it('should fetch people', () => {

});

it('should fetch world information', () => {

});

it('should fetch species information', () => {

});

it('should choose a random film index', () => {
  const wrapper = shallow(<App />);
  const mockFilms = [{ episode_number: 1 }, { episode_number: 2 }];
  const filmIndex = wrapper.instance().getRandomFilmIndex(mockFilms);
  expect(filmIndex).toBeLessThanOrEqual(mockFilms.length);
});