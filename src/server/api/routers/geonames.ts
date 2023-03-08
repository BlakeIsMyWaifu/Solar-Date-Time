import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { searchLocation, searchTimezone } from '~/utils/geoData'
import { z } from 'zod'

export const geonamesRouter = createTRPCRouter({
	autocompleteLocations: publicProcedure
		.input(z.object({
			location: z.string(),
			countryCode: z.string().optional()
		}))
		.mutation(async ({ input }) => {
			if (!input.location.length) return {}
			const locationData = await searchLocation(input.location, { maxRows: 5, countryCode: input.countryCode })
			if (!locationData.geonames[0]) return {}
			const { lat, lng } = locationData.geonames[0]
			const timezoneData = await searchTimezone(+lat, +lng)
			return {
				geodata: locationData.geonames,
				timezone: timezoneData
			}
		})
})
