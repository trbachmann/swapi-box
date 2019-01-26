import React from 'react';
import Card from '../Card/Card';

export const Display = ({data, category}) => {
    let cards = data.map(item => {
      return <Card {...item} category={category}/>
    })
    console.log(data)
    return(
      <div>
        {cards}
      </div>
    )
}
