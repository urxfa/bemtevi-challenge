import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

import routes from './routes/index.ts';

const app = routes;

app.use('*', logger());
app.use(
  '*',
  cors({
    origin: ['http://localhost:5173', 'https://bemtevi-challenge-frontend.vercel.app'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.get('/', (c) => c.text('Funcionando!!'));

export default app;
