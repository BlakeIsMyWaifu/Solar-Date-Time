import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { searchLocation } from '~/utils/geoData'
import { z } from 'zod'

export const geonamesRouter = createTRPCRouter({

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
