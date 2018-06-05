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

    const nbCharactersPerPage = 50;
    const characters = await Marvel.fetchCharacters(page * nbCharactersPerPage);

    this.setState({
      characters
    });
  }

  componentDidMount() {
    this.fetch(this.props.page);
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props;
    if (page !== prevProps.page) {
      this.fetch(page);
    }
  }

  renderHeroes() {
    return this.state.characters.map(character => (
      <div key={character.id} className="card m-3" style={{ width: '200px' }}>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          className="card-img-top"
        />
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
      <div className="d-flex flex-wrap">{this.renderHeroes()}</div>
    ) : (
      <p>Please wait...</p>
    );
  }
}
