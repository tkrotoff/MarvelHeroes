import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import * as Marvel from './http/Marvel';

export interface QueryParams {
  id: string;
}

export interface Props extends RouteComponentProps<QueryParams> {}

export interface State {
  character: Marvel.Character | undefined;
}

export default class Hero extends React.Component<Props, State> {
  state: State = {
    character: undefined
  };

  async fetch(id: string) {
    this.setState({
      character: undefined
    });

    const character = await Marvel.fetchCharacter(id);

    this.setState({
      character
    });
  }

  componentDidMount() {
    this.fetch(this.props.match.params.id);
  }

  componentDidUpdate(prevProps: Props) {
    const { id } = this.props.match.params;
    if (id !== prevProps.match.params.id) {
      this.fetch(id);
    }
  }

  static renderHero(character: Marvel.Character) {
    return (
      <>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          className="img-fluid" // Resize image on mobile
        />
        <h3>{character.name}</h3>
        <p>{character.description}</p>
        <h6>Comics</h6>
        {Hero.renderCategory(character, 'comics')}
        <h6>Series</h6>
        {Hero.renderCategory(character, 'series')}
        <h6>Stories</h6>
        {Hero.renderCategory(character, 'stories')}
      </>
    );
  }

  static renderCategory(character: Marvel.Character, category: string) {
    return (
      <ul>
        {(character[category] as Marvel.CharacterCategory).items.map((item, index) => (
          <li key={`${category}.${index}`}>{item.name}</li>
        ))}
      </ul>
    );
  }

  render() {
    const { character } = this.state;

    return character !== undefined ? (
      <div className="hero">{Hero.renderHero(character)}</div>
    ) : (
      <p>Please wait...</p>
    );
  }
}
