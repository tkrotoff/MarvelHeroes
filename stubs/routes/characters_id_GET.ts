import { HttpStatus } from '@tkrotoff/fetch';
import express from 'express';
import path from 'node:path';

export default async function stub(req: express.Request, res: express.Response) {
  const { id } = req.params as { id: string };

  const file = path.resolve(__dirname, `characters_id_GET_200_OK-${id}.json`);

  try {
    const character = await import(file);
    res.status(HttpStatus._200_OK).send(character);
  } catch {
    switch (id) {
      case 'unknown': {
        res.status(HttpStatus._404_NotFound).send();
        break;
      }
      default: {
        throw new Error(`STUB NOT IMPLEMENTED, id: '${id}'`);
      }
    }
  }
}
