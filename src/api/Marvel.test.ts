/* eslint-disable jest/no-mocks-import */

import { fakeFetchResponseError, fakeFetchResponseSuccess } from '../utils/fakeFetchResponse';
import { config } from '../config';
import character_id_1011334 from './__mocks__/character_id_1011334.json';
import characters_offset_0 from './__mocks__/characters_offset_0.json';
import characters_offset_10200 from './__mocks__/characters_offset_10200.json';
import * as Marvel from './Marvel';

test('getQueryParams()', () => {
  expect(Marvel.getQueryParams()).toMatch(
    /^ts=.*&apikey=298bab46381a6daaaee19aa5c8cafea5&hash=.*&limit=50$/
  );

  expect(Marvel.getQueryParams(100)).toMatch(
    /^ts=.*&apikey=298bab46381a6daaaee19aa5c8cafea5&hash=.*&limit=50&offset=100$/
  );
});

const fetchSpy = jest.spyOn(window, 'fetch');
afterEach(fetchSpy.mockClear);

describe('fetchCharacters()', () => {
  test('success "200 OK"', async () => {
    fetchSpy.mockResolvedValue(fakeFetchResponseSuccess(characters_offset_0));

    const characters = await Marvel.fetchCharacters(0 * config.nbCharactersPerPage);
    expect(characters).toEqual(characters_offset_0.data.results);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  test('success "200 OK" with empty data.results', async () => {
    fetchSpy.mockResolvedValue(fakeFetchResponseSuccess(characters_offset_10200));

    const characters = await Marvel.fetchCharacters(204 * config.nbCharactersPerPage);
    expect(characters).toEqual(characters_offset_10200.data.results);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  test('error "500 Internal Server Error"', async () => {
    fetchSpy.mockResolvedValue(fakeFetchResponseError('500 Internal Server Error'));

    await expect(Marvel.fetchCharacters(500 * config.nbCharactersPerPage)).rejects.toThrow(
      '500 Internal Server Error'
    );

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  test('error "429 Too Many Requests"', async () => {
    fetchSpy.mockResolvedValue(fakeFetchResponseError('429 Too Many Requests'));

    await expect(Marvel.fetchCharacters(429 * config.nbCharactersPerPage)).rejects.toThrow(
      '429 Too Many Requests'
    );

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});

describe('fetchCharacter()', () => {
  test('success "200 OK"', async () => {
    fetchSpy.mockResolvedValue(fakeFetchResponseSuccess(character_id_1011334));

    const characters = await Marvel.fetchCharacter('1011334');
    expect(characters).toEqual(character_id_1011334.data.results[0]);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  test('error "404 Not Found"', async () => {
    fetchSpy.mockResolvedValue(fakeFetchResponseError('404 Not Found'));

    await expect(Marvel.fetchCharacter('unknown')).rejects.toThrow('404 Not Found');

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
