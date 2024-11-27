import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

import { handle } from 'hono/vercel'

import routes from './routes/index.ts';

const app = routes;

app.use('*', logger());
app.get('/', (c) => c.text('Funcionando!!'));

export default handle(app);
