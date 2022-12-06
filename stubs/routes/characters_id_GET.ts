import express from 'express';
import path from 'node:path';

export default async function stub(req: express.Request, res: express.Response) {
  const { id } = req.params as { id: string };

  const file = path.resolve(__dirname, `characters_id_GET_200_OK-${id}.json`);

  try {
    const character = await import(file);
    res.status(200).send(character);
  } catch {
    switch (id) {
      case 'unknown': {
        res.status(404).send();
        break;
      }
      default: {
        throw new Error(`STUB NOT IMPLEMENTED, id: '${id}'`);
      }
    }
  }
}
