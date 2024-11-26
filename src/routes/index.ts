import { Hono } from "hono";
import { cors } from 'hono/cors'

import authRoutes from "./auth.ts";
import userRoutes from './user.ts';
import insurerRoutes from "./insurer.ts";
import dashboardRoutes from "./dashboard.ts";

const routes = new Hono()

routes.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

routes.route('/auth', authRoutes);
routes.route('/user', userRoutes);
routes.route('/insurer', insurerRoutes)
routes.route('/dashboard', dashboardRoutes);

export default routes;