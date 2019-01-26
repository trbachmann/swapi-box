import { fetchSWData } from "../api/apicalls";

export const cleanVehicleData = (vehicles) => {
  return vehicles.map(vehicle => {
    return {
      name: vehicle.name,
      model: vehicle.model,
      vehicle_class: vehicle.vehicle_class,
      passengers: vehicle.passengers
    }
  });
}

export const cleanPeopleData = (people) => {
  return people.map(person => {
    return {
      name: person.name,
      created: person.created,
      species: person.species,
      url: person.url,
      homeworld: person.homeworld,
      type: 'person',
    }
  });
}
export const addHomeWorldInfo = (people) => {
  const peopleWithWorldInfo = people.map(async (person) => {
    try {
      const planetInfo = await fetchSWData(person.homeworld);
      return {
        ...person,
        homeworld_name: planetInfo.name,
        population: planetInfo.population,
      }
    } catch(error) {
      throw error;
    }
  });
  return Promise.all(peopleWithWorldInfo);
}

export const addSpeciesInfo = (people) => {
  const peopleWithSpeciesName = people.map(async (person) => {
    if (person.species.length > 0) {
      try {
        const speciesInfo = await fetchSWData(person.species[0]);
        return { 
          ...person, 
          species_name: speciesInfo.name 
        }
      } catch (error) {
         throw error;
      }
    } else {
      return {
        ...person,
        species_name: 'unknown'
      }
    }
  });
  return Promise.all(peopleWithSpeciesName);
}

export const getRandomFilmIndex = (films) => {
  let index = Math.floor((Math.random() * films.length));
  return index;
}

export const selectFilm = async () => {
  let filmToShow
  try {
    const films = await fetchSWData('https://swapi.co/api/films');
    let index = await getRandomFilmIndex(films.results)
    filmToShow = await films.results[index];
    return filmToShow;
  } catch (error) {
    throw error;
  }
}

