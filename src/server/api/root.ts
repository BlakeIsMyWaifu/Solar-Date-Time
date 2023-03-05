import { geonamesRouter } from '~/server/api/routers/geonames'
import { createTRPCRouter } from '~/server/api/trpc'

import { calculationsRouter } from './routers/calculations'

export const appRouter = createTRPCRouter({
	geonames: geonamesRouter,
	calculations: calculationsRouter
})

export type AppRouter = typeof appRouter;
