import React from 'react';

export const FilmScroll = ({ film }) => {
  return(
    <div className="film-scroll">
      <p>{film.opening_crawl}</p>
      <p>{film.title}</p>
      <p>{film.release_date}</p>
      <p>Choose a Category</p>
    </div>
  )
}
