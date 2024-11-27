import { logger } from 'hono/logger';
import { handle } from '@hono/node-server/vercel'

import routes from './routes/index.ts';

const app = routes;

app.use('*', logger());
app.get('/', (c) => c.text('Funcionando!!'));

export default handle(app);
