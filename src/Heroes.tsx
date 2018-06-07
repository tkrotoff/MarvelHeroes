import React from 'react';
import { Link } from 'react-router-dom';

import * as Marvel from './http/Marvel';

export interface Props {
  page: number;
}

export interface State {
  characters: Marvel.Characters | undefined;
}

export default class Heroes extends React.Component<Props, State> {
  state: State = {
    characters: undefined
  };

  async fetch(page: number) {
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

  componentDidUpdate(prevProps: Props) {
    const { page } = this.props;
    if (page !== prevProps.page) {
      this.fetch(page);
    }
  }

  static renderHeroes(characters: Marvel.Characters) {
    return characters.map(character => (
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
    const { characters } = this.state;

    return characters !== undefined ? (
      <div className="d-flex flex-wrap">{Heroes.renderHeroes(characters)}</div>
    ) : (
      <p>Please wait...</p>
    );
  }
}
