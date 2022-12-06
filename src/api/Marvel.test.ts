import * as Http from '@tkrotoff/fetch';
import { createJSONResponsePromise, createResponsePromise, HttpStatus } from '@tkrotoff/fetch';

import character_id_1011334 from '../../stubs/routes/characters_id_GET_200_OK-1011334.json';
import characters_offset_0 from '../../stubs/routes/characters_offset-0.json';
import characters_offset_10200 from '../../stubs/routes/characters_offset-10200.json';
import { config } from '../config';
import { fetchCharacter, fetchCharacters, getQueryParams } from './Marvel';

test('getQueryParams()', () => {
  expect(getQueryParams()).toMatch(/^ts=.*&apikey=298bab46381a6daaaee19aa5c8cafea5&hash=.*$/);

  expect(getQueryParams(100)).toMatch(
    /^ts=.*&apikey=298bab46381a6daaaee19aa5c8cafea5&hash=.*&limit=50&offset=100$/
  );
});

// https://github.com/aelbore/esbuild-jest/issues/26#issuecomment-968853688
// https://github.com/swc-project/swc/issues/5059
jest.mock('@tkrotoff/fetch', () => ({
  __esModule: true,
  ...jest.requireActual('@tkrotoff/fetch')
}));

const getSpy = jest.spyOn(Http, 'get');
afterEach(getSpy.mockClear);

const controller = new AbortController();

describe('fetchCharacters()', () => {
  test('success "200 OK"', async () => {
    getSpy.mockImplementation(() => createJSONResponsePromise(characters_offset_0));

    const characters = await fetchCharacters(0 * config.nbCharactersPerPage, controller);
    expect(characters).toEqual(characters_offset_0.data.results);

    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  test('success "200 OK" with empty data.results', async () => {
    getSpy.mockImplementation(() => createJSONResponsePromise(characters_offset_10200));

    const characters = await fetchCharacters(204 * config.nbCharactersPerPage, controller);
    expect(characters).toEqual(characters_offset_10200.data.results);

    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  test('error "500 Internal Server Error"', async () => {
    getSpy.mockImplementation(() =>
      createResponsePromise(undefined, { status: HttpStatus._500_InternalServerError })
    );

    await expect(fetchCharacters(500 * config.nbCharactersPerPage, controller)).rejects.toThrow(
      '500'
    );

    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  test('error "429 Too Many Requests"', async () => {
    getSpy.mockImplementation(() =>
      createResponsePromise(undefined, { status: HttpStatus._429_TooManyRequests })
    );

    await expect(fetchCharacters(429 * config.nbCharactersPerPage, controller)).rejects.toThrow(
      '429'
    );

    expect(getSpy).toHaveBeenCalledTimes(1);
  });
});

describe('fetchCharacter()', () => {
  test('success "200 OK"', async () => {
    getSpy.mockImplementation(() => createJSONResponsePromise(character_id_1011334));

    const characters = await fetchCharacter('1011334', controller);
    expect(characters).toEqual(character_id_1011334.data.results[0]);

    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  test('error "404 Not Found"', async () => {
    getSpy.mockImplementation(() =>
      createResponsePromise(undefined, { status: HttpStatus._404_NotFound })
    );

    await expect(fetchCharacter('unknown', controller)).rejects.toThrow('404');

    expect(getSpy).toHaveBeenCalledTimes(1);
  });
});
