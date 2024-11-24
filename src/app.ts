import { serve } from '@hono/node-server';
import routes from './routes/index.ts';

const app = routes;
const port = 3000;

serve({
  fetch: app.fetch,
  port,
});

