import { Hono } from 'hono';
import type { Context } from 'hono';

const insurerRoutes = new Hono();

import { z } from 'zod'

import authenticate from '../middlewares/authenticate';
import type { InsurerAttributes } from '../models/Insurer';
import type { InsuranceTypeAttributes } from '../models/InsuranceType';

// Types
import insurancesTypes from '../types/insuranceTypesTypes';
const insuranceTypeValues = Object.values(insurancesTypes) as [string, ...string[]];


import { createInsurer, getInsurerByUid, updateInsurerInfo, createInsurance, getAllInsurances } from '../services/insurerService'

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

const insuranceTypeCreateSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  type: z.enum(insuranceTypeValues),
  coverage: z.string().min(1, { message: "Coverage information is required" }),
  priceRange: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, { message: "Price range must be a positive number" }), // Validação correta após conversão
  conditions: z.string().min(1, { message: "Conditions are required" }),
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

    return c.json(insurer);
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
    return c.json({ message: "Error on update info" }, 500)
  }
});

insurerRoutes.post('/create/insurance', authenticate, async (c: Context) => {
  try {

    const body = await c.req.json();
    const { uid } = c.get('user');

    const validatedData = insuranceTypeCreateSchema.parse(body);
    const insurance = await createInsurance(uid, validatedData as InsuranceTypeAttributes)

    return c.json(insurance);

  } catch (err) {
    return c.json({ message: "Error on creating new insurance" }, 500);
  }
})

insurerRoutes.get('/insurances', authenticate, async (c: Context) => {
  try {
    const { uid } = c.get('user');

    const page = parseInt(c.req.query('page') || '1', 10);
    const pageSize = parseInt(c.req.query('pageSize') || '10', 10);


    const insurances = await getAllInsurances(uid, page, pageSize);
    return c.json(insurances);

  } catch (err) {
    return c.json({ message: "Error in getting insurances" }, 500);
  }
});

export default insurerRoutes;
