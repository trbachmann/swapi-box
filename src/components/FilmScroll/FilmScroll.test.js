import React from 'react';
import { FilmScroll } from './FilmScroll';
import { shallow } from 'enzyme';

describe('FilmScroll', () => {
  const film = {
    opening_crawl: 'Turmoil has engulfed the Galactic Republic.',
    title: 'The Phantom Menace',
    release_date: '1999-05-09'
  };

  it('should match the snapshot with all data passed in', () => {
    const wrapper = shallow(
      <FilmScroll film={film} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});