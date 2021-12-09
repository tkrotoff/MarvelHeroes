import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import * as Marvel from './api/Marvel';
import { assert } from './utils/assert';
import { useErrorHandler } from './utils/useErrorHandler';
import { usePageTitle } from './utils/usePageTitle';

function Category({ character, category }: { character: Marvel.Character; category: string }) {
  return (
    <ul>
      {(character[category] as Marvel.CharacterCategory).items.map(item => (
        <li key={item.resourceURI}>{item.name}</li>
      ))}
    </ul>
  );
}

function Character({ character }: { character: Marvel.Character }) {
  usePageTitle(character.name);

  return (
    <section className="hero">
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className="img-fluid" // Resize image on mobile
      />
      <h1>{character.name}</h1>
      <p>{character.description}</p>
      <h6>Comics</h6>
      <Category character={character} category="comics" />
      <h6>Series</h6>
      <Category character={character} category="series" />
      <h6>Stories</h6>
      <Category character={character} category="stories" />
    </section>
  );
}

export function Hero() {
  usePageTitle('...');

  const handleError = useErrorHandler();
  const [character, setCharacter] = useState<Marvel.Character>();

  const { id } = useParams<'id'>();
  assert(id !== undefined, 'Param id cannot be empty');

  useEffect(() => {
    async function fetch(_id: string) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setCharacter(undefined);
      try {
        const _character = await Marvel.fetchCharacter(_id);
        setCharacter(_character);
      } catch (e) {
        handleError(e);
      }
    }

    fetch(id);
  }, [id, handleError]);

  return character !== undefined ? <Character character={character} /> : <p>Please wait...</p>;
}
