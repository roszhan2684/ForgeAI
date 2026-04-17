import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

type GlobalPrisma = { prisma: PrismaClient | undefined };
const g = globalThis as unknown as GlobalPrisma;

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  const adapter = new PrismaPg({ connectionString: url });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

// Lazy singleton — only instantiated on first property access at runtime
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    if (!g.prisma) {
      g.prisma = createClient();
    }
    const value = (g.prisma as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === "function" ? value.bind(g.prisma) : value;
  },
});
