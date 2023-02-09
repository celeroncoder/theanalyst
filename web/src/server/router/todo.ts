import { z } from "zod";
import { createProtectedRouter } from "./context";
import { Priority } from "@prisma/client";

const todoInput = z.object({
  title: z.string(),
  description: z.string(),
  dueDate: z.date().optional(),
  priority: z.nativeEnum(Priority),
});

export const todoRouter = createProtectedRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.todo.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: {
          completed: "asc",
        },
      });
    },
  })
  .query("getOne", {
    input: z.object({
      id: z.string().cuid(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.todo.findFirst({
        where: { userId: ctx.session.user.id, id: input.id },
      });
    },
  })
  .mutation("create", {
    input: todoInput,
    async resolve({ ctx, input }) {
      return await ctx.prisma.todo.create({
        data: {
          userId: ctx.session.user.id,
          title: input.title,
          description: input.description,
          dueDate: input.dueDate,
          priority: input.priority,
        },
        select: {
          id: true,
        },
      });
    },
  })
  .mutation("toggleComplete", {
    input: z.object({
      id: z.string().cuid(),
      completed: z.boolean(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.todo.update({
        where: { id: input.id },
        // currently there's no method to togglee boolean field, so we'll do that in the client
        data: { completed: input.completed },
      });
    },
  })
  .mutation("update", {
    input: todoInput.merge(
      z.object({
        id: z.string().cuid(),
      })
    ),
    async resolve({ ctx, input }) {
      return await ctx.prisma.todo.update({
        where: { id: input.id },
        data: input,
      });
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string().cuid(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.todo.delete({ where: { id: input.id } });
    },
  });
