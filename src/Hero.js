import React from 'react';

import * as Marvel from './http/Marvel';

export default class Hero extends React.Component {
  state = {
    character: undefined
  };

  componentDidMount() {
    this.fetch(this.props.match.params.id);
  }

  async fetch(id) {
    this.setState({
      character: undefined
    });

    const character = await Marvel.fetchCharacter(id);

    this.setState({
      character
    });
  }

  renderHero() {
    const { character } = this.state;
    return (
      <div>
        <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} style={{maxWidth: "100%"}} />
        <div>
          <h3>{character.name}</h3>
          <p>{character.description}</p>
          <h6>Comics</h6>
          {this.renderCategory('comics')}
          <h6>Series</h6>
          {this.renderCategory('series')}
          <h6>Stories</h6>
          {this.renderCategory('stories')}
        </div>
      </div>
    );
  }

  renderCategory(category) {
    const { character } = this.state;

    return <ul>{character[category].items.map((item, index) => <li key={`${category}.${index}`}>{item.name}</li>)}</ul>;
  }

  render() {
    return this.state.character !== undefined ? <div className="hero">{this.renderHero()}</div> : <p>Please wait...</p>;
  }
}
