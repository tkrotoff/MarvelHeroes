import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import * as Marvel from './api/Marvel';
import { setPageTitle } from './utils/setPageTitle';
import { useErrorHandler } from './utils/useErrorHandler';
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
  // Could also be a variable outside instead of a ref
  const controller = useRef<AbortController>();

  setPageTitle(`Page ${page}`);

  const handleError = useErrorHandler();

  const [characters, setCharacters] = useState<Marvel.Characters>();

  useEffect(() => {
    async function fetch(_page: number) {
      controller.current?.abort();
      controller.current = new AbortController();

      // eslint-disable-next-line unicorn/no-useless-undefined
      setCharacters(undefined);
      try {
        const _characters = await Marvel.fetchCharacters(
          _page * config.nbCharactersPerPage,
          controller.current
        );
        setCharacters(_characters);
      } catch (e) {
        // istanbul ignore next
        if (e instanceof Error && e.name === 'AbortError') {
          // Aborting a fetch throws an error
        } else {
          handleError(e);
        }
      }
    }

    fetch(page);

    return () => {
      controller.current?.abort();
    };
  }, [page, handleError]);

  if (characters === undefined) {
    return <p>Please wait...</p>;
  }
  if (characters.length === 0) {
    return <p>No results found :(</p>;
  }
  return <Characters characters={characters} />;
}
