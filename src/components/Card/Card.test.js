import React from 'react';
import { Card } from './Card';
import { shallow } from 'enzyme';

const mockPerson = { type: 'people', name: 'Han', homeworld_name: 'Alderaan', species_name: 'human', population: '200000', created: '239D'}
const mockPlanet = { type: 'planets', name: 'Hoth', terrain: 'rocky', population: '3200000', climate: 'temperate', residents: ['R2D2', 'Mark'], created:'275F' };
const mockVehicle = { type: 'vehicles', name: 'Crawler', model: 'Digger Crawler', class: 'construction', passengers: '1', created: '2987C'};
const mockHandleFavorite = jest.fn();
const mockIsFavorite = true;
describe('Card', () => {
  
  it('should match the snapshot with people data passed in', () => {
    const wrapper = shallow(<Card 
      item={mockPerson} 
      handleFavorite={mockHandleFavorite}
      isFavorite={mockIsFavorite}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with planet data passed in', () => {
    const wrapper = shallow(<Card
      item={mockPlanet}
      handleFavorite={mockHandleFavorite}
      isFavorite={mockIsFavorite}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with people data passed in', () => {
    const wrapper = shallow(<Card
      item={mockVehicle}
      handleFavorite={mockHandleFavorite}
      isFavorite={mockIsFavorite}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleFavorite once when a user clicks the fa-star icon', () => {
    const wrapper = shallow(<Card
      item={mockPerson}
      handleFavorite={mockHandleFavorite}
      isFavorite={mockIsFavorite}
    />);

    wrapper.find('i.fa-star').simulate('click');
    expect(mockHandleFavorite).toHaveBeenCalledTimes(1);
  });

  it('should call handleFavorite with the item.created prop when a user clicks the fa-star icon', () => {
    const wrapper = shallow(<Card
      item={mockPerson}
      handleFavorite={mockHandleFavorite}
      isFavorite={mockIsFavorite}
    />);
    wrapper.find('i.fa-star').simulate('click');
    expect(mockHandleFavorite).toHaveBeenCalledWith(mockPerson.created);
  })
});