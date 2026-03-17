import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new administrative user
export const createAdminUser = mutation({
  args: {
    email: v.string(),
    password: v.string(), // Must be hashed properly in a real backend
  },
  handler: async (ctx, args) => {
    // Basic verification - check if user already exists
    const existingUser = await ctx.db
      .query("administrativeUsers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new Error("Admin email already registered.");
    }

    const userId = await ctx.db.insert("administrativeUsers", {
      email: args.email,
      password: args.password,
      createdAt: Date.now(),
    });

    return userId;
  },
});

// List all administrative users
export const listAdminUsers = query({
  args: {},
  handler: async (ctx) => {
    // Ideally, pagination should be used, but sending all for simplicity
    return await ctx.db.query("administrativeUsers").order("desc").collect();
  },
});

// Remove an administrative user
export const removeAdminUser = mutation({
  args: {
    id: v.id("administrativeUsers"),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db.get(args.id);
    if (!existingUser) {
      throw new Error("Admin user not found.");
    }

    // Protection to not delete the last remaining admin
    const totalAdminsCount = (await ctx.db.query("administrativeUsers").collect()).length;
    if (totalAdminsCount <= 1) {
      throw new Error("Cannot delete the last remaining administrator.");
    }
    
    await ctx.db.delete(args.id);
  },
});
