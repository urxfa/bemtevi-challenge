import type { Context, Next } from 'hono';
import { verifyToken } from '../auth'

const authenticate = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader) {
    return c.json({ message: 'Authorization header missing' }, 401);
  }

  const token = authHeader.replace('Bearer ', '');
  console.log('Token: ', token);

  const decoded = verifyToken(token);

  if (!decoded) {
    return c.json({ message: 'Invalid or expired token' }, 401);
  }

  c.set('user', decoded);

  await next();
};

export default authenticate;