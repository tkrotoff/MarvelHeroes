import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import * as Marvel from './api/Marvel';
import { assert } from './utils/assert';
import { useErrorBoundary } from './utils/useErrorBoundary';

function renderCategory(character: Marvel.Character, category: string) {
  return (
    <ul>
      {(character[category] as Marvel.CharacterCategory).items.map(item => (
        <li key={item.resourceURI}>{item.name}</li>
      ))}
    </ul>
  );
}

function renderHero(character: Marvel.Character) {
  return (
    <section className="hero">
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className="img-fluid" // Resize image on mobile
      />
      <h3>{character.name}</h3>
      <p>{character.description}</p>
      <h6>Comics</h6>
      {renderCategory(character, 'comics')}
      <h6>Series</h6>
      {renderCategory(character, 'series')}
      <h6>Stories</h6>
      {renderCategory(character, 'stories')}
    </section>
  );
}

export function Hero() {
  const errorBoundary = useErrorBoundary();
  const [character, setCharacter] = useState<Marvel.Character | undefined>(undefined);
  const { id } = useParams();
  assert(id !== undefined, 'id cannot be undefined');

  useEffect(() => {
    async function fetch(_id: string) {
      setCharacter(undefined);
      try {
        const _character = await Marvel.fetchCharacter(_id);
        setCharacter(_character);
      } catch (e) {
        errorBoundary(e);
      }
    }

    fetch(id);
  }, [id, errorBoundary]);

  return character !== undefined ? renderHero(character) : <p>Please wait...</p>;
}
