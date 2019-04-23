import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import * as Marvel from './api/Marvel';

export interface QueryParams {
  id: string;
}

export interface Props extends RouteComponentProps<QueryParams> {}

export function Hero(props: Props) {
  const [character, setCharacter] = useState<Marvel.Character | undefined>(undefined);
  const { id } = props.match.params;

  useEffect(() => {
    async function fetch(_id: string) {
      setCharacter(undefined);
      const _character = await Marvel.fetchCharacter(_id);
      setCharacter(_character);
    }

    fetch(id);
  }, [id]);

  function renderCategory(_character: Marvel.Character, category: string) {
    return (
      <ul>
        {(_character[category] as Marvel.CharacterCategory).items.map(item => (
          <li key={item.resourceURI}>{item.name}</li>
        ))}
      </ul>
    );
  }

  function renderHero(_character: Marvel.Character) {
    return (
      <>
        <img
          src={`${_character.thumbnail.path}.${_character.thumbnail.extension}`}
          alt={_character.name}
          className="img-fluid" // Resize image on mobile
        />
        <h3>{_character.name}</h3>
        <p>{_character.description}</p>
        <h6>Comics</h6>
        {renderCategory(_character, 'comics')}
        <h6>Series</h6>
        {renderCategory(_character, 'series')}
        <h6>Stories</h6>
        {renderCategory(_character, 'stories')}
      </>
    );
  }

  return character !== undefined ? (
    <div className="hero">{renderHero(character)}</div>
  ) : (
    <p>Please wait...</p>
  );
}
