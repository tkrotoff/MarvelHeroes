/* eslint-disable import/first */

import { config } from '../../config';
import characters_offset_0 from './characters_offset_0.json';
import characters_offset_50 from './characters_offset_50.json';
import characters_offset_10200 from './characters_offset_10200.json';

export function fetchCharacters(offset: number) {
  let characters;

  switch (offset) {
    case 0:
      characters = characters_offset_0.data.results;
      break;
    case 50:
      characters = characters_offset_50.data.results;
      break;
    case 204 /* 204 No Content ;-) */ * config.nbCharactersPerPage:
      characters = characters_offset_10200.data.results;
      break;
    case 500 * config.nbCharactersPerPage:
      throw new Error('500 Internal Server Error');
    default:
      throw new Error(`Unknown offset: "${offset}"`);
  }

  return Promise.resolve(characters);
}

import character_id_1009144 from './character_id_1009144.json';
import character_id_1011334 from './character_id_1011334.json';
import character_id_1017100 from './character_id_1017100.json';

export function fetchCharacter(id: string) {
  let character;

  switch (id) {
    case '1011334':
      character = character_id_1011334.data.results[0]; // eslint-disable-line prefer-destructuring
      break;
    case '1017100':
      character = character_id_1017100.data.results[0]; // eslint-disable-line prefer-destructuring
      break;
    case '1009144':
      character = character_id_1009144.data.results[0]; // eslint-disable-line prefer-destructuring
      break;
    case 'unknown':
      throw new Error('404 Not Found');
    default:
      throw new Error(`Unknown id: "${id}"`);
  }

  return Promise.resolve(character);
}
