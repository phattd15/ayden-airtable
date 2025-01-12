import { z } from 'zod';
import { eq, ne, gt, gte } from 'drizzle-orm';

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { bases } from '~/server/db/schema';

export const baseRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(bases).values({
        name: input.name,
        userId: ctx.session.user.id,
        createdAt: new Date(),
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number().int(),
        name: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(bases)
        .set({ name: input.name })
        .where(eq(bases.id, input.id));
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const basesList = await ctx.db.select().from(bases);
    return basesList;
  }),
});
