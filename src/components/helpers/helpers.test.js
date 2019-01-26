import * as Helper from './helpers';
import * as API from "../api/apicalls";

describe('Helpers', () => {
  let mockUrl = 'https://www.swapi.co/fake';
  let mockPeople = [
    { name: 'Luke Skywalker', homeworld: mockUrl, species: [mockUrl], created: "2014-12-09T13:50:51.644000Z", url: "https://swapi.co/fake1/", eye_color: "blue", birth_year: "19BBY", gender: "male"}, 
    { name: 'Leia Skywalker', homeworld: mockUrl, species: [mockUrl], created: "2014-12-09T13:50:51.689000Z", url: "https://swapi.co/fake2/", eye_color: "blue", birth_year: "19BBY", gender: "female"}
  ];
  
  describe('cleanPeopleData', () => {
    it('should return people with the correct params', () => {
      const expected = [
        { name: 'Luke Skywalker', homeworld: mockUrl, species: [mockUrl], created: "2014-12-09T13:50:51.644000Z", url: "https://swapi.co/fake1/", type:'people' },
        { name: 'Leia Skywalker', homeworld: mockUrl, species: [mockUrl], created: "2014-12-09T13:50:51.689000Z", url: "https://swapi.co/fake2/", type: 'people'}
      ];
      const result = Helper.cleanPeopleData(mockPeople);
      expect(result).toEqual(expected);
    });
  });

  describe('addHomeWorldInfo', () => {
    let mockPlanetInfo = {name: 'mars', population: '3890'}
    
    beforeEach(() => {
      mockPeople = Helper.cleanPeopleData(mockPeople);
      API.fetchSWData = jest.fn(() => mockPlanetInfo);
    });
    
    afterEach(() => {
      jest.clearAllMocks();
    })
    
    it('should return people with homeworld and population', async () => {
      const expected = [
        { name: 'Luke Skywalker', homeworld_name: 'mars', population: '3890', type: 'people', species: [mockUrl], created: "2014-12-09T13:50:51.644000Z", url: "https://swapi.co/fake1/", homeworld: mockUrl }, 
        { name: 'Leia Skywalker', homeworld_name: 'mars', population: '3890', type: 'people', species: [mockUrl], created: "2014-12-09T13:50:51.689000Z", url: "https://swapi.co/fake2/", homeworld: mockUrl }
      ]
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
      mockPeople = Helper.cleanPeopleData(mockPeople);
      API.fetchSWData = jest.fn(() => mockSpeciesInfo);
    });

    afterEach(() => {
      jest.clearAllMocks();
    })

    it('should return people with species name', async () => {
      const expected = [
        { name: 'Luke Skywalker', species_name: 'robot', type: 'people', species: [mockUrl], created: "2014-12-09T13:50:51.644000Z", url: "https://swapi.co/fake1/", homeworld: mockUrl },
        { name: 'Leia Skywalker', species_name: 'robot', type: 'people', species: [mockUrl], created: "2014-12-09T13:50:51.689000Z", url: "https://swapi.co/fake2/", homeworld: mockUrl }
      ];
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

  describe('cleanFilmData', () => {
    let mockFilm = { opening_crawl: 'Lorem Ipsum', title: 'Empire Strike Back', release_date: '1995', created: 'zxkasdjfkld00999', actors: ['luke', 'han', 'r2d2'] };
    
    it('should return film with the correct paramaters', () => {
      const expected = { opening_crawl: 'Lorem Ipsum', title: 'Empire Strike Back', release_date: '1995' };
      const result = Helper.cleanFilmData(mockFilm);
      expect(result).toEqual(expected);
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
      expect(mockFilms).toContainEqual(result);
    });

    it('should throw an error if something is not okay with the fetched data', async () => {
      const expectedError = 'Error fetching, code: 401';
      API.fetchSWData = jest.fn(() => {
        throw Error('Error fetching, code: 401')
      });
      await expect(Helper.selectFilm()).rejects.toThrow(expectedError);
    });
  });

  describe('cleanVehicleData', () => {
    let mockVehicles = [{ name: '', model: 'sand crawler', vehicle_class: 'digger', passengers: '1', created: '2014-12-10T15:36:25.724000Z', cost_in_credits: "150000", length: "36.8" }, { name: '', model: 'flyer', vehicle_class: 'comfy flyer', passengers: '10', created: '2014-12-10T15:36:25.724000X', cost_in_credits: "150000", length: "36.8" }];
    
    it('should return vehicles with the correct parameters', () => {
      const expected = [{ name: '', model: 'sand crawler', vehicle_class: 'digger', passengers: '1', created: '2014-12-10T15:36:25.724000Z', type: 'vehicles' }, { name: '', model: 'flyer', vehicle_class: 'comfy flyer', passengers: '10', created: '2014-12-10T15:36:25.724000X', type: 'vehicles' }]
      const result = Helper.cleanVehicleData(mockVehicles);
      expect(result).toEqual(expected);
    });
  });
  
});