// Everytime we change something ie hot reloading, it will not create multiple prisma clients and so no warning of multiple instances of prisma clients

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb; // i.e., development

export default prismadb;
