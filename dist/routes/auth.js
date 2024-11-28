import bcrypt from 'bcrypt';
import { Hono } from 'hono';
const authRoutes = new Hono();
// Models
import User from '../models/User';
import Insurer from '../models/Insurer';
import { generateToken } from '../auth';
import { z } from 'zod';
const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1)
});
authRoutes.post('/user', async (c) => {
    const body = await c.req.json();
    const validateData = loginSchema.parse(body);
    const user = await User.findOne({ where: { email: validateData.email } });
    if (!user || !bcrypt.compareSync(validateData.password, user.get('password'))) {
        return c.json({ message: 'Invalid email or password' }, 401);
    }
    const token = generateToken(user.get('uid'), false);
    return c.json({ token });
});
authRoutes.post('/insurer', async (c) => {
    const body = await c.req.json();
    const validateData = loginSchema.parse(body);
    const insurer = await Insurer.findOne({ where: { email: validateData.email } });
    if (!insurer || !bcrypt.compareSync(validateData.password, insurer.get('password'))) {
        return c.json({ message: 'Invalid email or password' }, 401);
    }
    const token = generateToken(insurer.get('uid'), true);
    return c.json({ token });
});
export default authRoutes;
