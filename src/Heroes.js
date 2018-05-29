import React from 'react';

import * as Marvel from './Marvel';

export default class Heroes extends React.Component {
  state = {
    characters: [],
    fetching: false
  };

  async fetch(offset) {
    this.setState({
      characters: [],
      fetching: true
    });

    const characters = await Marvel.fetchCharacters(offset);

    this.setState({
      characters,
      fetching: false
    });
  }

  async componentDidMount() {
    this.fetch(this.props.offset);
  }

  async componentWillReceiveProps(nextProps) {
    this.fetch(nextProps.offset);
  }

  render() {
    const heroes = this.state.characters.map(character => (
      <div key={character.id} className="hero card m-3">
        <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{character.name}</h5>
        </div>
        <div className="card-footer border-top-0">
          <a href="#" className="card-link">Details</a>
          {/*<Link to={`/character/${character.id}`}>Details</Link>*/}
        </div>
      </div>
    ));

    return this.state.fetching ? <p>Please wait...</p> : <div className="heroes">{heroes}</div>;
  }
}
