import React from 'react';

import Heroes from './Heroes';

export default class HeroesPage extends React.Component {
  state = {
    offset: 0
  };

  handlePrevButtonClick = () => {
    this.setState(prevState => ({
      offset: prevState.offset - 50
    }));
  };

  handleNextButtonClick = () => {
    this.setState(prevState => ({
      offset: prevState.offset + 50
    }));
  };

  render() {
    const { offset } = this.state;

    return (
      <div className="container-fluid">
        <h3>Marvel Heroes</h3>
        <button onClick={this.handlePrevButtonClick} disabled={offset === 0} className="btn btn-primary">&laquo; Previous</button>
        {' '}
        <button onClick={this.handleNextButtonClick} className="btn btn-primary">Next &raquo;</button>
        <Heroes offset={offset} />
      </div>
    );
  }
}
