import React from 'react';
import Card from '../Card/Card';

export const Display = ({data, category}) => {
    let cards = data.map(item => {
      return <Card {...item} category={category} key={data.created}/>
    })
    return(
      <div className="card-display">
        {cards}
      </div>
    )
}
