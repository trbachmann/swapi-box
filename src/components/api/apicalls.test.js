import { fetchSWData } from './apicalls';

describe('fetchSWData', () => {
  let mockUrl;
  let mockData = [{}, {}, {}, {}, {}];
  
  beforeEach(() => {
    window.fetch = jest.fn();
    mockUrl = 'https://swapi.co/api/people/';
  });

  it('should call fetch with the correct params', () => {
    fetchSWData(mockUrl);
    expect(window.fetch).toHaveBeenCalledWith(mockUrl);
  });

  it('should return star wars data if everything is okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData)
    }))

    const result = await fetchSWData(mockUrl);
    expect(result).toEqual(mockData);
  });

  it('should throw an error if everything is not okay', async () => {
    const expectedError = Error('Error fetching, code: 401')
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 401,
      ok: false
    }));

    await expect(fetchSWData(mockUrl)).rejects.toEqual(expectedError);
  });

});