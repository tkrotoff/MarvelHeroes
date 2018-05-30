import React from 'react';
import { Link } from 'react-router-dom';

import * as Marvel from './http/Marvel';

export default class Heroes extends React.Component {
  state = {
    characters: undefined
  };

  async fetch(page) {
    this.setState({
      characters: undefined
    });

    const nbElementsPerPage = 50;
    const characters = await Marvel.fetchCharacters(page * nbElementsPerPage);

    this.setState({
      characters
    });
  }

  componentDidMount() {
    console.log('Heroes.componentDidMount()');
    this.fetch(this.props.page);
  }

  componentDidUpdate(prevProps) {
    console.log('Heroes.componentDidUpdate()');
    const { page } = this.props;
    if (page !== prevProps.page) {
      this.fetch(page);
    }
  }

  renderHeroes() {
    return this.state.characters.map(character => (
      <div key={character.id} className="hero card m-3">
        <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{character.name}</h5>
        </div>
        <div className="card-footer border-top-0">
          <Link to={`/heroes/${character.id}`}>Details</Link>
        </div>
      </div>
    ));
  }

  render() {
    return this.state.characters !== undefined ? (
      <div className="heroes">{this.renderHeroes()}</div>
    ) : (
      <p>Please wait...</p>
    );
  }
}
