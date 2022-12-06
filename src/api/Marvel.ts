import { get } from '@tkrotoff/fetch';
import md5 from 'blueimp-md5';

const API_PUBLIC = '298bab46381a6daaaee19aa5c8cafea5';
const API_PRIVATE = 'b0223681fced28de0fe97e6b9cd091dd36a5b71d';
let BASE_URL = 'https://gateway.marvel.com';

// istanbul ignore next
if (process.env.NODE_ENV !== 'production') {
  // Use stub-server (localhost) in development mode
  // Allows for configurable delays: helps find bugs and possible improvements - add a spinner, disable a submit button...
  BASE_URL = '';
}

export interface CharacterCategory {
  available: number;
  collectionURI: string;
  items: [{ resourceURI: string; name: string; type?: string }];
  returned: number;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: { path: string; extension: string };
  resourceURI: string;
  comics: CharacterCategory;
  series: CharacterCategory;
  stories: CharacterCategory;
  events: CharacterCategory;
  urls: [{ type: string; url: string }];
  [index: string]:
    | CharacterCategory
    | string
    | number
    | Record<string, unknown>
    | Record<string, unknown>[];
}

export type Characters = Character[];

type Response = { data: { results: Characters } };

export function getQueryParams(offset?: number) {
  const ts = Date.now();

  const params = {
    ts,
    apikey: API_PUBLIC,
    hash: md5(ts + API_PRIVATE + API_PUBLIC),
    limit: offset === undefined ? undefined : 50,
    offset
  };

  // [How to pass url query params?](https://github.com/github/fetch/issues/256)
  return (Object.keys(params) as (keyof typeof params)[])
    .filter(key => params[key] !== undefined)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key]!)}`)
    .join('&');
}

export async function fetchCharacters(offset: number, controller: AbortController) {
  const response = (await get(`${BASE_URL}/v1/public/characters?${getQueryParams(offset)}`, {
    signal: controller.signal
  }).json()) as Response;
  return response.data.results;
}

export async function fetchCharacter(id: string, controller: AbortController) {
  const response = (await get(`${BASE_URL}/v1/public/characters/${id}?${getQueryParams()}`, {
    signal: controller.signal
  }).json()) as Response;
  return response.data.results[0];
}
