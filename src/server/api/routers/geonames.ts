import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import oldToSolar from '~/utils/oldToSolar'
import { z } from 'zod'

export const geonamesRouter = createTRPCRouter({
	oldToSolar: publicProcedure
		.input(z.object({
			location: z.string(),
			oldTime: z.tuple([z.number(), z.number()])
		}))
		.mutation(async ({ input }) => {
			const data = await oldToSolar({ hour: input.oldTime[0], minute: input.oldTime[1] }, input.location)
			return data
		})
})
