import { Hono } from "hono";

import authRoutes from "./auth.ts";
import userRoutes from './user.ts';
import insurerRoutes from "./insurer.ts";

const routes = new Hono()

routes.route('/auth', authRoutes);
routes.route('/user', userRoutes);
routes.route('/insurer', insurerRoutes)

export default routes;