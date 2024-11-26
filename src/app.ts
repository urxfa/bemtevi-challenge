import { serve } from '@hono/node-server';

import routes from './routes/index.ts';

import { logger } from 'hono/logger'

const app = routes;
const port = 3000;

app.use(logger())

serve({
  fetch: app.fetch,
  port,
});

