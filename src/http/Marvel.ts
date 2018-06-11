import axios from 'axios';
import md5 from 'blueimp-md5';

const API_PUBLIC = '298bab46381a6daaaee19aa5c8cafea5';
const API_PRIVATE = 'b0223681fced28de0fe97e6b9cd091dd36a5b71d';
const BASE_URL = 'https://gateway.marvel.com';

export function getParams(offset?: number) {
  const ts = Date.now();
  const hash = md5(ts + API_PRIVATE + API_PUBLIC);
  return {
    params: { ts, apikey: API_PUBLIC, hash, limit: 50, offset }
  };
}

interface CharactersResponse {
  data: {
    results: Characters;
  };
}

export type Characters = Character[];

export async function fetchCharacters(offset: number) {
  const res = await axios.get<CharactersResponse>(
    `${BASE_URL}/v1/public/characters`,
    getParams(offset)
  );
  return res.data.data.results;
}

export interface CharacterCategory {
  available: number;
  collectionURI: string;
  items: [
    {
      resourceURI: string;
      name: string;
      type?: string;
    }
  ];
  returned: number;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: CharacterCategory;
  series: CharacterCategory;
  stories: CharacterCategory;
  events: CharacterCategory;
  urls: [
    {
      type: string;
      url: string;
    }
  ];

  [index: string]: CharacterCategory | string | number | object;
}

export async function fetchCharacter(id: string) {
  const res = await axios.get<CharactersResponse>(
    `${BASE_URL}/v1/public/characters/${id}`,
    getParams()
  );
  return res.data.data.results[0];
}
