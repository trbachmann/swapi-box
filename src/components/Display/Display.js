import React from 'react';
import { Card } from '../Card/Card';
import PropTypes from 'prop-types';

export const Display = ({data, category}) => {
    let cards = data.map(item => {
    return <Card item={item} category={category} key={item.created}/>
    })
    return(
      <div className="card-display">
        {cards}
      </div>
    )
}

Card.propTypes = {
  item: PropTypes.object,
  category: PropTypes.string
}
