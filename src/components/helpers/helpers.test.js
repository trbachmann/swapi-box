import * as Helper from './helpers';
import * as API from "../api/apicalls";

describe('Helpers', () => {
  let mockUrl = 'https://www.swapi.com./fake';
  let mockPeople = [{ name: 'Luke Skywalker', homeworld: mockUrl }, { name: 'Leia Skywalker', homeworld: mockUrl }];

  describe('addHomeWorldInfo', () => {
    let mockPlanetInfo = {name: 'mars', population: '3890'}
    
    beforeEach(() => {
      API.fetchSWData = jest.fn(() => mockPlanetInfo);
    });
    
    afterEach(() => {
      jest.clearAllMocks();
    })
    
    it('should return people with homeworld and population', async () => {
      const expected = [{ name: 'Luke Skywalker', homeworld: 'mars', population: '3890', type: 'people' }, { name: 'Leia Skywalker', homeworld: 'mars', population: '3890', type: 'people' }]
      const result = await Helper.addHomeWorldInfo(mockPeople);
      expect(result).toEqual(expected);
    });

    it('should fetch data the correct number of times', () => {
      Helper.addHomeWorldInfo(mockPeople);
      expect(API.fetchSWData).toHaveBeenCalledTimes(2);
    });

    it('should return an error if something is not okay with the fetched data', async () => {
      API.fetchSWData = jest.fn(() => {
        throw Error('Error fetching, code: 401') 
      });
      const expectedError = Error('Error fetching, code: 401');
      await expect(Helper.addHomeWorldInfo(mockPeople)).rejects.toThrow(expectedError);
    });
  }); 
});