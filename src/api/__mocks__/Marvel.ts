/* eslint-disable import/first */

import characters_offset_0 from './characters_offset_0.json';
import characters_offset_50 from './characters_offset_50.json';

export function fetchCharacters(offset: number) {
  let characters;

  switch (offset) {
    case 0:
      characters = Promise.resolve(characters_offset_0.data.results);
      break;
    case 50:
      characters = Promise.resolve(characters_offset_50.data.results);
      break;
    default:
      throw new Error(`Unknown offset ${offset}`);
  }
  return characters;
}

import character_id_1011334 from './character_id_1011334.json';
import character_id_1017100 from './character_id_1017100.json';
import character_id_1009144 from './character_id_1009144.json';

export function fetchCharacter(id: string) {
  let character;

  switch (id) {
    case '1011334':
      character = Promise.resolve(character_id_1011334.data.results[0]);
      break;
    case '1017100':
      character = Promise.resolve(character_id_1017100.data.results[0]);
      break;
    case '1009144':
      character = Promise.resolve(character_id_1009144.data.results[0]);
      break;
    default:
      throw new Error(`Unknown id ${id}`);
  }

  return character;
}
