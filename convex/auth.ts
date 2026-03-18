import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const register = mutation({
  args: {
    naturezaJuridica: v.string(),
    nomeCompleto: v.string(),
    documento: v.string(),
    cep: v.string(),
    telefone: v.string(),
    endereco: v.string(),
    numero: v.string(),
    bairro: v.string(),
    cidade: v.string(),
    estado: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (existing) {
      throw new Error("Usuário já cadastrado");
    }
    const userId = await ctx.db.insert("users", {
      ...args,
      createdAt: Date.now(),
    });
    return userId;
  },
});

export const login = query({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (!user || user.password !== args.password) {
      return null;
    }
    return user;
  },
});

export const resetPassword = mutation({
  args: {
    email: v.string(),
    documento: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // Verifica se o documento (CPF/CNPJ) confere com o e-mail para autorizar a troca
    if (user.documento !== args.documento) {
      throw new Error("Documento de verificação incorreto");
    }

    await ctx.db.patch(user._id, {
      password: args.newPassword,
    });
    
    return { success: true };
  },
});
