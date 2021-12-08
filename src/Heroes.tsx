import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as Marvel from './api/Marvel';
import { useErrorHandler } from './utils/useErrorHandler';
import { usePageTitle } from './utils/usePageTitle';
import { config } from './config';

function Characters({ characters }: { characters: Marvel.Characters }) {
  return (
    <div className="row g-3 mt-0 mb-3">
      {characters.map(character => (
        <div key={character.id} className="col">
          <section className="card h-100" style={{ minWidth: 200, maxWidth: 575 }}>
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>
            </div>
            <div className="card-footer border-top-0">
              <Link to={`/heroes/${character.id}`}>Details</Link>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}

interface Props {
  page: number;
}

export function Heroes({ page }: Props) {
  usePageTitle(`Page ${page}`);

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
