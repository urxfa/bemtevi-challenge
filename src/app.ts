import { serve } from '@hono/node-server';

import routes from './routes/index.ts';

import { logger } from 'hono/logger'

const app = routes;
const port = 3000;

app.use(logger())

app.get('/', async c => {
  return c.text("Funcionando!!")
})

serve({
  fetch: app.fetch,
  port,
});

