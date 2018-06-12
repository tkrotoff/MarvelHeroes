import mockFetch from '../mockFetch';
import * as Marvel from './Marvel';

test('getQueryParams()', () => {
  expect(Marvel.getQueryParams()).toMatch(
    /^ts=.*&apikey=298bab46381a6daaaee19aa5c8cafea5&hash=.*&limit=50$/
  );

  expect(Marvel.getQueryParams(100)).toMatch(
    /^ts=.*&apikey=298bab46381a6daaaee19aa5c8cafea5&hash=.*&limit=50&offset=100$/
  );
});

import characters_offset_0 from './__mocks__/characters_offset_0.json';

test('fetchCharacters()', async () => {
  window.fetch = mockFetch(characters_offset_0);

  const characters = await Marvel.fetchCharacters(0);
  expect(characters).toEqual(characters_offset_0.data.results);

  expect(window.fetch).toHaveBeenCalledTimes(1);
});

import character_id_1011334 from './__mocks__/character_id_1011334.json';

test('fetchCharacter()', async () => {
  window.fetch = mockFetch(character_id_1011334);

  const characters = await Marvel.fetchCharacter('1011334');
  expect(characters).toEqual(character_id_1011334.data.results[0]);

  expect(window.fetch).toHaveBeenCalledTimes(1);
});
