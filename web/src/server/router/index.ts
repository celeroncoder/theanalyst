// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { matchRouter } from "./match";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("match.", matchRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
