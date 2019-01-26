import * as Helper from './helpers';
import * as API from "../api/apicalls";

describe('Helpers', () => {
  let mockUrl = 'https://www.swapi.com./fake';
  let mockPeople = [{ name: 'Luke Skywalker', homeworld: mockUrl, species: [mockUrl] }, { name: 'Leia Skywalker', homeworld: mockUrl, species: [mockUrl] }];

  describe('addHomeWorldInfo', () => {
    let mockPlanetInfo = {name: 'mars', population: '3890'}
    
    beforeEach(() => {
      API.fetchSWData = jest.fn(() => mockPlanetInfo);
    });
    
    afterEach(() => {
      jest.clearAllMocks();
    })
    
    it('should return people with homeworld and population', async () => {
      const expected = [{ name: 'Luke Skywalker', homeworld: 'mars', population: '3890', type: 'people', species:[mockUrl] }, { name: 'Leia Skywalker', homeworld: 'mars', population: '3890', type: 'people', species: [mockUrl] }]
      const result = await Helper.addHomeWorldInfo(mockPeople);
      expect(result).toEqual(expected);
    });

    it('should fetch data the correct number of times', () => {
      let correctNumberOfTimes = mockPeople.length
      Helper.addHomeWorldInfo(mockPeople);
      expect(API.fetchSWData).toHaveBeenCalledTimes(correctNumberOfTimes);
    });

    it('should throw an error if something is not okay with the fetched data', async () => {
      API.fetchSWData = jest.fn(() => {
        throw Error('Error fetching, code: 401') 
      });
      const expectedError = Error('Error fetching, code: 401');
      await expect(Helper.addHomeWorldInfo(mockPeople)).rejects.toThrow(expectedError);
    });
  }); 

  describe('addSpeciesInfo', () => {
    let mockSpeciesInfo = {name: 'robot'};

    beforeEach(() => {
      API.fetchSWData = jest.fn(() => mockSpeciesInfo);
    });

    afterEach(() => {
      jest.clearAllMocks();
    })

    it('should return people with species name', async () => {
      const expected = [{ name: 'Luke Skywalker', homeworld: mockUrl, species: [mockUrl], species_name: 'robot' }, { name: 'Leia Skywalker', homeworld: mockUrl, species: [mockUrl], species_name: 'robot' }];
      const result = await Helper.addSpeciesInfo(mockPeople)
      expect(result).toEqual(expected);
    });

    it('should return people with species name unknown if there is no species url', async () => {
      const mockPersonNoSpecies = [{ name: 'Captain Secret', homeworld: mockUrl, species: [] }];
      const expected = [{ name: 'Captain Secret', homeworld: mockUrl, species: [], species_name: 'unknown' }];
      const result = await Helper.addSpeciesInfo(mockPersonNoSpecies);
      expect(result).toEqual(expected);
    });

    it('should fetch data the correct number of times', ()=> {
      let correctNumberOfTimes = mockPeople.length;
      Helper.addSpeciesInfo(mockPeople);
      expect(API.fetchSWData).toHaveBeenCalledTimes(correctNumberOfTimes);
    });

    it('should throw an error is something is not okay with the fetch data', async () => {
      API.fetchSWData = jest.fn(() => {
        throw Error('Error fetching, code: 401')
      });
      const expectedError = 'Error fetching, code: 401';
      await expect(Helper.addSpeciesInfo(mockPeople)).rejects.toThrow(expectedError);
    });
  });

  describe('getRandomFilmIndex', () => {
    it('should get a random index', () => {
      let mockFilms = [{}, {}, {}, {}, {}, {}, {}];
      let result = Helper.getRandomFilmIndex(mockFilms);
      expect(result).toBeLessThan(mockFilms.length);
    });
  });

  describe('selectFilm', () => {
    let mockFilms = [{ opening_crawl: 'Lorem Ipsum', title: 'Empire Strike Back', release_date: '1995' }, { opening_crawl: 'Lorem Ipsum', title: 'Empire Strike Back Again', release_date: '1996' }, { opening_crawl: 'Lorem Ipsum', title: 'Empire Strike Back 4', release_date: '1975' }];
    let mockFilmData = {results: mockFilms};
    
    beforeEach(() => {
      API.fetchSWData = jest.fn(() => mockFilmData);
    });

    afterEach(() =>{
      jest.clearAllMocks();
    });

    it('should return a film', async () => {
      const result = await Helper.selectFilm();
      expect(mockFilms).toContain(result);
    });

    it('should throw an error if something is not okay with the fetched data', async () => {
      const expectedError = 'Error fetching, code: 401';
      API.fetchSWData = jest.fn(() => {
        throw Error('Error fetching, code: 401')
      });
      await expect(Helper.selectFilm()).rejects.toThrow(expectedError);
    });
  });

});