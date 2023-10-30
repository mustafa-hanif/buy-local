import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const add = mutation({
  args: { 
    name: v.string(),
    local: v.string(),
    country: v.string(),
    type: v.string(),
    alternate: v.optional(v.id("products")),
  },
  handler: async (ctx, { name, country, local, type, alternate }) => {
    // Send a new message.
    await ctx.db.insert("products", { name, country, local, type, alternate });
  },
});