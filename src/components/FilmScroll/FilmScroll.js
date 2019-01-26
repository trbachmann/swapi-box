import React from 'react';

export const FilmScroll = (props) => {
  return(
    <div className="film-scroll">
      <p>{props.film.opening_crawl}</p>
      <p>{props.film.title}</p>
      <p>{props.film.release_date}</p>
      <p>Choose a Category</p>
    </div>
  )
}
