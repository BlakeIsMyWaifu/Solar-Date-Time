import { geonamesRouter } from '~/server/api/routers/geonames'
import { createTRPCRouter } from '~/server/api/trpc'

export const appRouter = createTRPCRouter({
	geonames: geonamesRouter
})

export type AppRouter = typeof appRouter;
