import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    console.log(this.props);
    let card;
    switch(this.props.type){
      case 'people':
        card = <div>
          <h3>{this.props.name}</h3>
          <p>Homeworld: {this.props.homeworld}</p>
          <p>Species: {this.props.species_name}</p>
          <p>Population: {this.props.population}</p>
          <button>Add to Favorites</button>
        </div>;
        break;
      case 'planets':
        card = <div>
          <h3>Name</h3>
          <p>Terrain: </p>
          <p>Population: </p>
          <p>Climate:</p>
          <p>Residents: </p>
          <button>Add to Favorites</button>
        </div>;
        break;
      case 'vehicles':
        card = <div>
          <h3>Name</h3>
          <p>Model: </p>
          <p>Class: </p>
          <p>Number of Passengers:</p>
          <button>Add to Favorites</button>
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
}

export default Card;