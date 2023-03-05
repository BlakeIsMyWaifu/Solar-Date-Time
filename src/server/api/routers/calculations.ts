import oldToSolar from '~/utils/oldToSolar'
import solarToOld from '~/utils/solarToOld'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const calculationsRouter = createTRPCRouter({
	oldToSolar: publicProcedure
		.input(z.object({
			location: z.union([z.string(), z.tuple([z.number(), z.number()])]),
			oldTime: z.tuple([z.number(), z.number()])
		}))
		.mutation(async ({ input }) => {
			const data = await oldToSolar({ hour: input.oldTime[0], minute: input.oldTime[1] }, input.location)
			return data
		}),
	solarToOld: publicProcedure
		.input(z.object({
			location: z.union([z.string(), z.tuple([z.number(), z.number()])]),
			solarity: z.enum(['Day', 'Night']),
			solarTime: z.number()
		}))
		.mutation(async ({ input }) => {
			const data = await solarToOld(input.location, input.solarity, input.solarTime)
			return data
		})
})