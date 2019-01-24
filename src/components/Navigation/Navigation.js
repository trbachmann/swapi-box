import React, { Component } from 'react';
import './Navigation.scss';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let { updateCategory, favorites } = this.props
    return(
      <div className="navigation">
        <button onClick={() => updateCategory('people')}>People</button>
        <button onClick={() => updateCategory('planets')}>Planets</button>
        <button onClick={() => updateCategory('vehicles')}>Vehicles</button>
        <button onClick={() => updateCategory('favorites')}>View {favorites} Favorite</button>
      </div>
    )
  }
}

export default Navigation;