import React from 'react';
import { Card } from '../Card/Card';
import PropTypes from 'prop-types';

export const Display = ({data, favorites, handleFavorite}) => {
    let cards = data.map(item => {
      let isFavorite;
      
      if (favorites.includes(item.created)){
        isFavorite = true;
      } else {
        isFavorite = false;
      }

      return <Card item={item} key={item.created} handleFavorite={handleFavorite} isFavorite={isFavorite}/>
    })
    
    return(
      <div className="card-display">
        {cards}
      </div>
    )
}

Card.propTypes = {
  item: PropTypes.object,
  handleFavorite: PropTypes.func,
  isFavorite: PropTypes.bool
}
