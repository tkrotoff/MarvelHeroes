import axios, { AxiosStatic } from 'axios';

import * as Marvel from './Marvel';

jest.mock('axios');

test('getParams()', () => {
  expect(Marvel.getParams()).toEqual({
    params: {
      apikey: '298bab46381a6daaaee19aa5c8cafea5',
      hash: expect.any(String),
      limit: 50,
      offset: undefined,
      ts: expect.any(Number)
    }
  });

  expect(Marvel.getParams(100)).toEqual({
    params: {
      apikey: '298bab46381a6daaaee19aa5c8cafea5',
      hash: expect.any(String),
      limit: 50,
      offset: 100,
      ts: expect.any(Number)
    }
  });
});

import characters_offset_0 from './__mocks__/characters_offset_0.json';

test('fetchCharacters()', async () => {
  (axios as jest.Mocked<AxiosStatic>).get.mockResolvedValue(characters_offset_0);

  const characters = await Marvel.fetchCharacters(0);
  expect(characters).toEqual(characters_offset_0.data.results);
});

import character_id_1011334 from './__mocks__/character_id_1011334.json';

test('fetchCharacter()', async () => {
  (axios as jest.Mocked<AxiosStatic>).get.mockResolvedValue(character_id_1011334);

  const characters = await Marvel.fetchCharacter('1011334');
  expect(characters).toEqual(character_id_1011334.data.results[0]);
});
