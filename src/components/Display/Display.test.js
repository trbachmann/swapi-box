import React from 'react';
import { Display } from './Display';
import { shallow } from 'enzyme';
import { Card } from '../Card/Card';

const mockPerson1 = { type: 'people', name: 'Han', homeworld_name: 'Alderaan', species_name: 'human', population: '200000', created: '239D' }
const mockPerson2 = { type: 'people', name: 'Luke', homeworld_name: 'Nabu', species_name: 'human', population: '502000', created: '239F'}
const mockFavorites = ['239F'];
const mockHandleFavorite = jest.fn();

describe('Display', () => {
  it('should match the snapshot with all data passed in', () => {
    const wrapper = shallow(
      <Display 
        data={[mockPerson1, mockPerson2]}
        favorites={mockFavorites}
        handleFavorite={mockHandleFavorite}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a card with the correct props', () => {
    const wrapper = shallow(<Display 
      data={[mockPerson1]}
      favorites={mockFavorites}
      handleFavorite={mockHandleFavorite}
    />)
    expect(wrapper.children(Card).length).toEqual(1);
    const { item, handleFavorite, isFavorite } = wrapper.find(Card).props();
    expect(item).toEqual(mockPerson1);
    expect(handleFavorite).toEqual(mockHandleFavorite);
    expect(isFavorite).toEqual(false);
  });
})