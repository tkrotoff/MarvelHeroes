import express from 'express';

import { config } from '../../src/config';
import characters_offset_0 from './characters_offset-0.json';
import characters_offset_50 from './characters_offset-50.json';
import characters_offset_100 from './characters_offset-100.json';
import characters_offset_150 from './characters_offset-150.json';
import characters_offset_10200 from './characters_offset-10200.json';

export default function stub(req: express.Request, res: express.Response) {
  const offset = Number((req.query as { offset: string }).offset);

  switch (offset) {
    case 0: {
      res.status(200).send(characters_offset_0);
      break;
    }
    case 1 * config.nbCharactersPerPage: {
      res.status(200).send(characters_offset_50);
      break;
    }
    case 2 * config.nbCharactersPerPage: {
      res.status(200).send(characters_offset_100);
      break;
    }
    case 3 * config.nbCharactersPerPage: {
      res.status(200).send(characters_offset_150);
      break;
    }
    case 204 /* 204 No Content ;-) */ * config.nbCharactersPerPage: {
      res.status(200).send(characters_offset_10200);
      break;
    }
    case 429 /* 429 Too Many Requests */ * config.nbCharactersPerPage: {
      res.status(429).send();
      break;
    }
    default: {
      throw new Error(`STUB NOT IMPLEMENTED, offset: '${offset}'`);
    }
  }
}
