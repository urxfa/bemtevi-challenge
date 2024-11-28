import type { Context } from 'hono';
import { serve } from '@hono/node-server'

import { logger } from 'hono/logger';

import routes from './routes/routes';

const app = routes;

app.use('*', logger());

app.get('/', (c: Context) => c.text('Funcionando!!'));

serve({
  fetch: app.fetch,
  port: 3000,
})

