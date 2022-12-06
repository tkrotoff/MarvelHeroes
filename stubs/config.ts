import { StubServerConfig } from '@tkrotoff/stub-server';
import path from 'node:path';

type Environments = { [name: string]: { target: string | undefined } };

const environments: Environments = {
  'marvel.com': { target: 'https://gateway.marvel.com' },
  stubs: { target: undefined }
};

const { target } = environments[process.env.API ?? 'stubs'];

const stubsPath = path.resolve(__dirname, 'routes');

export const config: StubServerConfig = {
  delay: { min: 0, max: 1000 },
  routes: {
    '/v1/public/characters': {
      GET: target ?? `${stubsPath}/characters_GET.ts`
    },
    '/v1/public/characters/:id': {
      GET: target ?? `${stubsPath}/characters_id_GET.ts`
    }
  }
};

export default config;
