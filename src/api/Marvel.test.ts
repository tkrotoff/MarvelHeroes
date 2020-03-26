/* eslint-disable jest/no-mocks-import */

import { fakeFetchResponseSuccess, fakeFetchResponseError } from '../utils/fakeFetchResponse';
import characters_offset_0 from './__mocks__/characters_offset_0.json';
import character_id_1011334 from './__mocks__/character_id_1011334.json';
import * as Marvel from './Marvel';

test('getQueryParams()', () => {
  expect(Marvel.getQueryParams()).toMatch(
    /^ts=.*&apikey=298bab46381a6daaaee19aa5c8cafea5&hash=.*&limit=50$/
  );

  expect(Marvel.getQueryParams(100)).toMatch(
    /^ts=.*&apikey=298bab46381a6daaaee19aa5c8cafea5&hash=.*&limit=50&offset=100$/
  );
});

describe('fetch*()', () => {
  const fetchSpy = jest.spyOn(window, 'fetch');
  afterEach(fetchSpy.mockClear);

  test('fetchCharacters() success', async () => {
    fetchSpy.mockResolvedValueOnce(fakeFetchResponseSuccess(characters_offset_0));

    const characters = await Marvel.fetchCharacters(0);
    expect(characters).toEqual(characters_offset_0.data.results);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  test('fetchCharacters() error', async () => {
    fetchSpy.mockResolvedValueOnce(fakeFetchResponseError('500 Internal Server Error'));

    await expect(Marvel.fetchCharacters(0)).rejects.toThrow('500 Internal Server Error');

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  test('fetchCharacter() success', async () => {
    fetchSpy.mockResolvedValueOnce(fakeFetchResponseSuccess(character_id_1011334));

    const characters = await Marvel.fetchCharacter('1011334');
    expect(characters).toEqual(character_id_1011334.data.results[0]);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  test('fetchCharacter() error', async () => {
    fetchSpy.mockResolvedValueOnce(fakeFetchResponseError('404 Not Found'));

    await expect(Marvel.fetchCharacter('unknown')).rejects.toThrow('404 Not Found');

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
