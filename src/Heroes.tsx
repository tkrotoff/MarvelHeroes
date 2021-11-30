import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as Marvel from './api/Marvel';
import { useErrorHandler } from './utils/useErrorHandler';
import { config } from './config';

function Characters({ characters }: { characters: Marvel.Characters }) {
  return (
    <div className="card-deck mt-3">
      {characters.map(character => (
        <section key={character.id} className="hero card">
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            className="card-img-top"
            style={{
              // Fix for IE11
              // [Flexbox on IE11: image stretched for no reason?](https://stackoverflow.com/q/36822370)
              flexShrink: 0,

              // Fix for IE10
              height: 'auto'
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{character.name}</h5>
          </div>
          <div className="card-footer border-top-0">
            <Link to={`/heroes/${character.id}`}>Details</Link>
          </div>
        </section>
      ))}
    </div>
  );
}

interface Props {
  page: number;
}

export function Heroes({ page }: Props) {
  const handleError = useErrorHandler();

  const [characters, setCharacters] = useState<Marvel.Characters>();

  useEffect(() => {
    async function fetch(_page: number) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setCharacters(undefined);
      try {
        const _characters = await Marvel.fetchCharacters(_page * config.nbCharactersPerPage);
        setCharacters(_characters);
      } catch (e) {
        handleError(e);
      }
    }

    fetch(page);
  }, [page, handleError]);

  if (characters === undefined) {
    return <p>Please wait...</p>;
  }
  if (characters.length === 0) {
    return <p>No results found :(</p>;
  }
  return <Characters characters={characters} />;
}
