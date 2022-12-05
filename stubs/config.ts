import { StubServerConfig } from '@tkrotoff/stub-server';
import path from 'node:path';

const stubsPath = path.resolve(__dirname, 'routes');

export const config: StubServerConfig = {
  delay: { min: 0, max: 2000 },
  routes: {
    '/v1/public/characters': {
      GET: `${stubsPath}/characters_GET.ts`
    },
    '/v1/public/characters/1009144': {
      GET: `${stubsPath}/characters_id_GET_200_OK-1009144.json`
    },
    '/v1/public/characters/1011334': {
      GET: `${stubsPath}/characters_id_GET_200_OK-1011334.json`
    },
    '/v1/public/characters/1017100': {
      GET: `${stubsPath}/characters_id_GET_200_OK-1017100.json`
    },
    '/v1/public/characters/:id': {
      GET: req => {
        throw new Error(`STUB NOT IMPLEMENTED, id: '${req.params.id}'`);
      }
    }
  }
};

export default config;
