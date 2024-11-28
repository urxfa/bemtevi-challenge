import { Hono } from "hono";
import { cors } from 'hono/cors'

import authRoutes from "./auth";
import userRoutes from './user';
import insurerRoutes from "./insurer";
import dashboardRoutes from "./dashboard";
import policyRoutes from "./policy";

const routes = new Hono()

routes.use(
  '*',
  cors({
    origin: ['http://localhost:5173', 'https://bemtevi-challenge-frontend.vercel.app'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

routes.route('/auth', authRoutes);
routes.route('/user', userRoutes);
routes.route('/insurer', insurerRoutes)
routes.route('/dashboard', dashboardRoutes);
routes.route('/policy', policyRoutes);


export default routes;