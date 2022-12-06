import { HttpStatus } from '@tkrotoff/fetch';
import express from 'express';
import path from 'node:path';

import { config } from '../../src/config';

export default async function stub(req: express.Request, res: express.Response) {
  const offset = Number((req.query as { offset: string }).offset);

  // Why file characters_offset-10200.json?
  // offset: 204 => 204 No Content ;-) => 204 * 50 => 10200

  const file = path.resolve(__dirname, `characters_offset-${offset}.json`);

  try {
    const character = await import(file);
    res.status(HttpStatus._200_OK).send(character);
  } catch {
    switch (offset) {
      case 429 /* 429 Too Many Requests */ * config.nbCharactersPerPage: {
        res.status(HttpStatus._429_TooManyRequests).send();
        break;
      }
      default: {
        throw new Error(`STUB NOT IMPLEMENTED, offset: '${offset}'`);
      }
    }
  }
}
