import cryptoJS from 'crypto-js';
import axios from 'axios';

const API_PUBLIC = '298bab46381a6daaaee19aa5c8cafea5';
const API_PRIVATE = 'b0223681fced28de0fe97e6b9cd091dd36a5b71d';
const BASE_URL = 'http://gateway.marvel.com/';

function getParams(offset) {
  const ts = Date.now();
  const hash = cryptoJS.MD5(ts + API_PRIVATE + API_PUBLIC).toString();
  return {
    params: { ts, apikey: API_PUBLIC, hash, limit: 50, offset }
  };
}

export async function fetchCharacters(offset) {
  const res = await axios(`${BASE_URL}/v1/public/characters`, getParams(offset));
  return res.data.data.results;
}

export async function fetchCharacter(id) {
  const res = await axios(`${BASE_URL}/v1/public/characters/${id}`, getParams());
  return res.data.data.results[0];
}
