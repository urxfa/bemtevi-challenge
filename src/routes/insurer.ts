import { Hono } from 'hono';
import type { Context } from 'hono';

const insurerRoutes = new Hono();

import { z } from 'zod'

import { createInsurer, getInsurerByUid, updateInsurerInfo } from '../services/insurerService.ts'
import type { InsurerAttributes } from '../models/Insurer.ts';
import authenticate from '../middlewares/authenticate.ts';

const insurerCreateSchema = z.object({
  company_name: z.string().min(1, { message: "Company name is required" }),
  cnpj: z.string().length(14, { message: "CNPJ must have 14 digits" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must have at least 8 characters" }),
  address: z.string().optional(),
  phone: z.string().optional(),
});

const insurerUpdateSchema = z.object({
  company_name: z.string().min(1, { message: "Company name is required" }).optional(),
  password: z.string().min(6, { message: "Password must have at least 8 characters" }).optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
});

insurerRoutes.post('/create', async (c: Context) => {
  try {
    const body = await c.req.json();

    const validatedData = insurerCreateSchema.parse(body);
    const newInsurer = await createInsurer(validatedData as InsurerAttributes);

    return c.json({ message: 'Insurer created successully', insurer: newInsurer }, 201)

  } catch (err) {
    return c.json({ message: 'Error on creating new insurer', reason: err }, 400)
  }
});

// Protected routes

insurerRoutes.get('/about', authenticate, async (c: Context) => {
  try {
    const { uid } = c.get('user');
    const insurer = await getInsurerByUid(uid);

    return c.json({ insurer });
  } catch (err) {
    return c.json({ message: "Error on getting info" }, 500)
  }
});

insurerRoutes.put('/about', authenticate, async (c: Context) => {
  try {
    const body = await c.req.json();

    const { uid } = c.get('user');
    const validatedData = insurerUpdateSchema.parse(body);

    const insurer = await updateInsurerInfo(uid, validatedData);

    return c.json({ insurer });
  } catch (err) {
    return c.json({ message: "Error on getting info" }, 500)
  }
});

export default insurerRoutes;