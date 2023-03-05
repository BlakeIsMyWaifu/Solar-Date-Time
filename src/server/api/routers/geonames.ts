import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import oldToSolar from '~/utils/oldToSolar'
import { searchLocation } from '~/utils/request'
import { z } from 'zod'

export const geonamesRouter = createTRPCRouter({
	oldToSolar: publicProcedure
		.input(z.object({
			location: z.union([z.string(), z.tuple([z.number(), z.number()])]),
			oldTime: z.tuple([z.number(), z.number()])
		}))
		.mutation(async ({ input }) => {
			const data = await oldToSolar({ hour: input.oldTime[0], minute: input.oldTime[1] }, input.location)
			return data
		}),
	autocompleteLocation: publicProcedure
		.input(z.object({
			location: z.string(),
			countryCode: z.string().optional()
		}))
		.mutation(async ({ input }) => {
			if (!input.location.length) return []
			const data = await searchLocation(input.location, { maxRows: 5, countryCode: input.countryCode })
			return data.geonames
		})
})
