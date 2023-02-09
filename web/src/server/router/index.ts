// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { todoRouter } from "./todo";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("todo.", todoRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
