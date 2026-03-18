import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Lista todos os clientes cadastrados
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").order("desc").collect();
    return users;
  },
});

// Remove um cliente pelo ID
export const remove = mutation({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Atualiza dados de um cliente
export const update = mutation({
  args: {
    id: v.id("users"),
    nomeCompleto: v.optional(v.string()),
    email: v.optional(v.string()),
    documento: v.optional(v.string()),
    telefone: v.optional(v.string()),
    cep: v.optional(v.string()),
    endereco: v.optional(v.string()),
    numero: v.optional(v.string()),
    bairro: v.optional(v.string()),
    cidade: v.optional(v.string()),
    estado: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    // Remove campos undefined antes de salvar
    const updates: Record<string, string> = {};
    for (const [key, val] of Object.entries(fields)) {
      if (val !== undefined) updates[key] = val;
    }
    await ctx.db.patch(id, updates);
  },
});
