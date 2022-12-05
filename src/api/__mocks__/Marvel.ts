import character_id_1009144 from '../../../stubs/routes/characters_id_GET_200_OK-1009144.json';
import character_id_1011334 from '../../../stubs/routes/characters_id_GET_200_OK-1011334.json';
import character_id_1017100 from '../../../stubs/routes/characters_id_GET_200_OK-1017100.json';
import characters_offset_0 from '../../../stubs/routes/characters_offset-0.json';
import characters_offset_50 from '../../../stubs/routes/characters_offset-50.json';
import characters_offset_100 from '../../../stubs/routes/characters_offset-100.json';
import characters_offset_150 from '../../../stubs/routes/characters_offset-150.json';
import characters_offset_10200 from '../../../stubs/routes/characters_offset-10200.json';
import { config } from '../../config';

export function fetchCharacters(offset: number) {
  let characters;

  switch (offset) {
    case 0: {
      characters = characters_offset_0.data.results;
      break;
    }
    case 1 * config.nbCharactersPerPage: {
      characters = characters_offset_50.data.results;
      break;
    }
    case 2 * config.nbCharactersPerPage: {
      characters = characters_offset_100.data.results;
      break;
    }
    case 3 * config.nbCharactersPerPage: {
      characters = characters_offset_150.data.results;
      break;
    }
    case 204 /* 204 No Content ;-) */ * config.nbCharactersPerPage: {
      characters = characters_offset_10200.data.results;
      break;
    }
    case 429 /* 429 Too Many Requests */ * config.nbCharactersPerPage: {
      throw new Error('429 Too Many Requests');
    }
    case 500 * config.nbCharactersPerPage: {
      throw new Error('500 Internal Server Error');
    }
    default: {
      throw new Error(`Unknown offset: '${offset}'`);
    }
  }

  return Promise.resolve(characters);
}

export function fetchCharacter(id: string) {
  let character;

  switch (id) {
    case '1011334': {
      character = character_id_1011334.data.results[0]; // eslint-disable-line prefer-destructuring
      break;
    }
    case '1017100': {
      character = character_id_1017100.data.results[0]; // eslint-disable-line prefer-destructuring
      break;
    }
    case '1009144': {
      character = character_id_1009144.data.results[0]; // eslint-disable-line prefer-destructuring
      break;
    }
    case 'unknown': {
      throw new Error('404 Not Found');
    }
    default: {
      throw new Error(`Unknown id: '${id}'`);
    }
  }

  return Promise.resolve(character);
}
