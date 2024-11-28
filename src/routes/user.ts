import { Hono } from 'hono';
import type { Context } from 'hono';

const userRoutes = new Hono();

import { z } from 'zod'
import { createUser, updateUser, getUserByUid, deleteUser } from '../services/userService';
import type { UserAttributes } from '../models/User';
import authenticate from '../middlewares/authenticate';

const userCreationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  cpf: z.string().length(11, 'CPF must have 11 characters'),
  email: z.string().email({ message: 'Invalid email address' }),
  sex: z.enum(['M', 'F'], { message: 'Sex must be M or F' }),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  address: z.string().optional(),
  phone: z.string().optional(),
  dateOfBirth: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return new Date(arg);
    }
    return arg;
  }, z.date().refine((date) => date <= new Date(), 'Date of birth must be in the past')),
});


const userUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  sex: z.enum(['M', 'F'], { message: 'Sex must be M or F' }).optional(),
  password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
  address: z.string().optional(),
  phone: z.string().optional()
});

userRoutes.post('/create', async (c: Context) => {
  try {
    const body = await c.req.json();

    const validatedData = userCreationSchema.parse(body);
    const newUser = await createUser(validatedData as UserAttributes);

    return c.json({ message: 'User created successfully', user: newUser }, 201);
  } catch (err) {
    return c.json({ message: 'Error on creating new user', reason: err }, 400)
  }
});

// Protected Routes

userRoutes.get('/me', authenticate, async (c: Context) => {
  try {

    const { uid } = c.get('user');
    const user = await getUserByUid(uid);


    return c.json(user, 200);
  }
  catch (err) {
    return c.json({ message: err }, 500)
  }
});


userRoutes.put('/me', authenticate, async (c: Context) => {
  try {
    const body = await c.req.json();
    const { uid } = c.get('user');

    const validatedData = userUpdateSchema.parse(body);
    const updatedUser = await updateUser(uid, validatedData as UserAttributes);

    return c.json({ message: 'User updated!', sucess: updateUser }, 200);
  }
  catch (err) {
    return c.json({ message: err, sucess: false }, 500)
  }
});

userRoutes.delete('/me', authenticate, async (c: Context) => {
  try {
    const { uid } = c.get('user');
    await deleteUser(uid);

    return c.json({ message: 'User deleted!', success: true }, 200);
  }
  catch (err) {
    return c.json({ message: err, success: false }, 500)
  }
});

export default userRoutes;
