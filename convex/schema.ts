import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
    createdAt: v.number(),
  }),
  users: defineTable({
    naturezaJuridica: v.string(),
    nomeCompleto: v.string(),
    documento: v.string(), // CPF or CNPJ
    cep: v.string(),
    endereco: v.string(),
    numero: v.string(),
    bairro: v.string(),
    cidade: v.string(),
    estado: v.string(),
    email: v.string(),
    password: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),
  serviceRequests: defineTable({
    companyName: v.string(),
    date: v.string(),
    equipmentType: v.string(),
    model: v.string(),
    serialNumber: v.string(),
    meter: v.optional(v.string()),
    description: v.string(),
    requestNumber: v.number(), // Sequential number
    createdAt: v.number(),
  }).index("by_requestNumber", ["requestNumber"]),
  productRequests: defineTable({
    companyName: v.string(),
    date: v.string(),
    items: v.array(
      v.object({
        quantity: v.number(),
        description: v.string(),
      })
    ),
    requestNumber: v.number(), // Sequential number
    createdAt: v.number(),
  }).index("by_requestNumber", ["requestNumber"]),
  estimateRequests: defineTable({
    companyName: v.string(),
    date: v.string(),
    items: v.array(
      v.object({
        type: v.string(), // "servico" or "produto"
        quantity: v.number(),
        description: v.string(),
      })
    ),
    requestNumber: v.number(),
    createdAt: v.number(),
  }).index("by_requestNumber", ["requestNumber"]),
  administrativeUsers: defineTable({
    email: v.string(),
    password: v.string(), // Remember to hash passwords in production!
    createdAt: v.number(),
  }).index("by_email", ["email"]),
});

