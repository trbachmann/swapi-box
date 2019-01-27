import React, { Component } from 'react';
import './_navigation.scss';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let { handleChosenCategory, favorites } = this.props
    return(
      <div className="navigation">
        <button onClick={() => handleChosenCategory('people')}>People</button>
        <button onClick={() => handleChosenCategory('planets')}>Planets</button>
        <button onClick={() => handleChosenCategory('vehicles')}>Vehicles</button>
        <button onClick={() => handleChosenCategory('favorites')}>View {favorites} Favorite</button>
      </div>
    )
  }
}

export default Navigation;