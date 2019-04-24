import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as Marvel from './api/Marvel';

export interface Props {
  page: number;
}

export function Heroes(props: Props) {
  const [characters, setCharacters] = useState<Marvel.Characters | undefined>(undefined);
  const { page } = props;

  useEffect(() => {
    async function fetch(_page: number) {
      setCharacters(undefined);

      const nbCharactersPerPage = 50;
      const _characters = await Marvel.fetchCharacters(_page * nbCharactersPerPage);

      setCharacters(_characters);
    }

    fetch(page);
  }, [page]);

  function renderHeroes(_characters: Marvel.Characters) {
    return _characters.map(character => (
      <section key={character.id} className="card m-3" style={{ width: '200px' }}>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          className="card-img-top"
          style={{
            // Fix for IE 11
            // See [Flexbox on IE11: image stretched for no reason?](https://stackoverflow.com/q/36822370)
            flexShrink: 0,

            // Fix for IE 10
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
    ));
  }

  return characters !== undefined ? (
    <div className="d-flex flex-wrap">{renderHeroes(characters)}</div>
  ) : (
    <p>Please wait...</p>
  );
}
