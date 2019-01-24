import React, { Component } from 'react';
import './Navigation.scss';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return(
      <div className="navigation">
        <button>People</button>
        <button>Planets</button>
        <button>Vehicles</button>
        <button>Favorite</button>
      </div>
    )
  }
}

export default Navigation;