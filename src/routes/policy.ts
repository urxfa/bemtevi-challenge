import { Hono } from 'hono';
import type { Context } from 'hono';
import authenticate from '../middlewares/authenticate';

import { createPolicy, approveOrRejectPolicy, getPendingPolicies, getApprovedPolicies } from '../services/policyService';
import Policy from '../models/Policy';

const policyRoutes = new Hono();

// Create a user Policy, Insurer must approve those
policyRoutes.post('/', authenticate, async (c: Context) => {
  try {
    const { uid, isInsurer } = c.get("user");
    const body = await c.req.json();

    const newPolicy = await createPolicy(uid, body);
    return c.json({ newPolicy });

  } catch (err) {
    return c.json({ message: err })
  }
});

policyRoutes.get('/pending', authenticate, async (c: Context) => {
  try {
    const { uid, isInsurer } = c.get("user");

    if (!isInsurer) {
      return c.json({ message: "User must be an Insurer to access pending policies" }, 403);
    }

    const page = parseInt(c.req.query("page") || "1", 10);
    const pageSize = parseInt(c.req.query("pageSize") || "10", 10);

    if (isNaN(page) || page < 1) {
      return c.json({ message: "Invalid page number" }, 400);
    }
    if (isNaN(pageSize) || pageSize < 1) {
      return c.json({ message: "Invalid page size" }, 400);
    }

    const pending = await getPendingPolicies(uid, page, pageSize);

    return c.json(pending, 200);
  } catch (err: any) {
    console.error("Error:", err);
    return c.json({ message: err.message || "An unexpected error occurred" }, 500);
  }
});

policyRoutes.put('/status/:id', authenticate, async (c: Context) => {
  try {
    const { uid, isInsurer } = c.get("user");

    if (!isInsurer) {
      return c.json({ message: "User must be an Insurer to approve or reject" }, 403);
    }
    const id = parseInt(c.req.param("id"), 10);
    if (isNaN(id)) {
      return c.json({ message: "Invalid policy ID" }, 400);
    }

    const body = await c.req.json();
    const reason = body.reason || null;

    await approveOrRejectPolicy(uid, id, reason);

    return c.json({ message: "Policy updated successfully" }, 200);

  } catch (err: any) {
    return c.json({ message: err.message || "An unexpected error occurred" }, 500);
  }
});

policyRoutes.get("/approved", authenticate, async (c: Context) => {
  try {
    const { uid, isInsurer } = c.get("user");

    if (isInsurer) {
      return c.json({ message: "Only users can access approved insurances" }, 403);
    }

    const page = parseInt(c.req.query("page") || "1", 10);
    const pageSize = parseInt(c.req.query("pageSize") || "10", 10);

    if (isNaN(page) || page < 1) {
      return c.json({ message: "Invalid page number" }, 400);
    }

    if (isNaN(pageSize) || pageSize < 1) {
      return c.json({ message: "Invalid page size" }, 400);
    }

    const policies = await getApprovedPolicies(uid, page, pageSize);

    return c.json(policies);

  } catch (err: any) {
    return c.json({ message: err.message || "An unexpected error occurred" }, 500);
  }
});

export default policyRoutes;