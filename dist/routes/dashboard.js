import { Hono } from 'hono';
import authenticate from '../middlewares/authenticate';
import { getDashboard } from '../services/dashboardService';
const dashboardRoutes = new Hono();
dashboardRoutes.get('/', authenticate, async (c) => {
    try {
        const { uid, isInsurer } = c.get('user');
        const dashboard = await getDashboard(uid, isInsurer);
        return c.json({ ...dashboard }, 200);
    }
    catch (err) {
        return c.json({
            message: err
        }, 500);
    }
});
export default dashboardRoutes;
