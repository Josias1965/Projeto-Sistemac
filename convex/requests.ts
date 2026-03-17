import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getNextRequestNumber = query({
  args: {},
  handler: async (ctx) => {
    const lastRequest = await ctx.db
      .query("serviceRequests")
      .order("desc")
      .first();
    if (!lastRequest) return 1;
    return lastRequest.requestNumber + 1;
  },
});

export const create = mutation({
  args: {
    companyName: v.string(),
    date: v.string(),
    equipmentType: v.string(),
    model: v.string(),
    serialNumber: v.string(),
    meter: v.optional(v.string()),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    // Generate next sequential number server-side
    const lastRequest = await ctx.db
      .query("serviceRequests")
      .order("desc")
      .first();
    const nextNumber = lastRequest ? lastRequest.requestNumber + 1 : 1;

    const requestId = await ctx.db.insert("serviceRequests", {
      ...args,
      requestNumber: nextNumber,
      createdAt: Date.now(),
    });
    return { requestId, nextNumber };
  },
});

export const createProduct = mutation({
  args: {
    companyName: v.string(),
    date: v.string(),
    items: v.array(
      v.object({
        quantity: v.number(),
        description: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Generate next sequential number server-side
    const lastRequest = await ctx.db
      .query("productRequests")
      .order("desc")
      .first();
    const nextNumber = lastRequest ? lastRequest.requestNumber + 1 : 1;

    const requestId = await ctx.db.insert("productRequests", {
      ...args,
      requestNumber: nextNumber,
      createdAt: Date.now(),
    });
    return { requestId, nextNumber };
  },
});

export const createEstimate = mutation({
  args: {
    companyName: v.string(),
    date: v.string(),
    items: v.array(
      v.object({
        type: v.string(),
        quantity: v.number(),
        description: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const lastRequest = await ctx.db
      .query("estimateRequests")
      .order("desc")
      .first();
    const nextNumber = lastRequest ? lastRequest.requestNumber + 1 : 1;

    const requestId = await ctx.db.insert("estimateRequests", {
      ...args,
      requestNumber: nextNumber,
      createdAt: Date.now(),
    });
    return { requestId, nextNumber };
  },
});
