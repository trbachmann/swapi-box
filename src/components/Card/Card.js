import React from 'react';

export const Card = ({item, category}) => {
  let card;
  switch(item.type) {
    case 'people':
      card = <div className='inner-card'>
        <div className='card-title'>
          <h3>{item.name}</h3>
          <i class="fas fa-star"></i>
        </div>
        <p>Homeworld: {item.homeworld_name}</p>
        <p>Species: {item.species_name}</p>
        <p>Population: {item.population}</p>
      </div>;
      break;
    case 'planets':
      card = <div className='inner-card'>
        <div className='card-title'>
          <h3>{item.name}</h3>
          <i class="fas fa-star"></i>
        </div>
        <p>Terrain: {item.terrain}</p>
        <p>Population: {item.population}</p>
        <p>Climate: {item.climate}</p>
        <p>Residents: </p>
        <ul>
          {item.residents.map(resident => {
            return <li key={resident}>{resident}</li>
          })}
        </ul>
      </div>;
      break;
    case 'vehicles':
      card = <div className='inner-card'>
        <div className='card-title'>
          <h3>{item.name}</h3>
          <i class="fas fa-star"></i>
        </div>
        <p>Model: {item.model}</p>
        <p>Class: {item.vehicle_class}</p>
        <p>Number of Passengers: {item.passengers}</p>
      </div>;
      break;
    default: 
      card = <h2>Sorry there are no cards for your selection. Please choose a different category.</h2>;
  }
  return(
    <div className='card'>
      {card}
    </div>
  )
}
