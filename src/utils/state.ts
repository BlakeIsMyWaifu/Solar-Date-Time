import { type StateCreator, create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { type GeonamesData } from './geoData'
import { modulo } from './maths'
import { secondsToTime, sunSeconds, timeToSeconds } from './time'

type Solarity = 'Day' | 'Night'

interface State {
	isOldToSolar: boolean;

	countryCode: string | null;
	locationData: GeonamesData | null;
	geoData: GeonamesData[];

	oldTime: {
		hour: number;
		minute: number;
	} | null;
	convertedSolarTime: {
		solarity: Solarity;
		number: string;
	} | null;

	solarity: Solarity;
	solarTime: number;
	convertedOldTime: string | null;
}

const stateSlice: State = {
	isOldToSolar: true,

	countryCode: null,
	locationData: null,
	geoData: [],

	oldTime: null,
	convertedSolarTime: null,

	solarity: 'Day',
	solarTime: 0,
	convertedOldTime: null
}

interface Action {
	toggleConverter: () => void;
	convertCurrent: () => void;

	setCountryCode: (countryCode: string) => void;
	setGeoData: (geoData: GeonamesData[]) => void;

	setOldTime: (time: string) => void;
	oldToSolar: () => void;

	setSolarity: (solarity: Solarity) => void;
	setSolarTime: (time: number) => void;
	solarToOld: () => void;
}

type ZustandDevtools = ['zustand/devtools', never]
type SubscribeWithSelector = ['zustand/subscribeWithSelector', never]

type Slice<T extends object, K extends object> = StateCreator<T, [ZustandDevtools, SubscribeWithSelector], [], K>

const actionSlice: Slice<Store, Action> = (set, get) => ({
	toggleConverter: () => {
		set(state => ({
			isOldToSolar: !state.isOldToSolar
		}))

		get().convertCurrent()
	},
	convertCurrent: () => {
		get().isOldToSolar ? get().oldToSolar() : get().solarToOld()
	},

	setCountryCode: countryCode => {
		set({
			countryCode
		}, false, 'setCountryCode')

		get().convertCurrent()
	},
	setGeoData: geoData => {
		set({
			geoData,
			locationData: geoData[0]
		}, false, 'setGeoData')

		get().convertCurrent()
	},

	setOldTime: time => {
		const [hour, minute] = time.split(':')

		set({
			oldTime: {
				hour: +(hour ?? 0),
				minute: +(minute ?? 0)
			}
		}, false, 'setOldTime')

		get().oldToSolar()
	},
	oldToSolar: () => {
		const { hour, minute } = get().oldTime ?? {}
		if (typeof hour !== 'number' || typeof minute !== 'number') return

		const oldTimeSeconds = timeToSeconds({ hour, minute })

		const { lat, lng } = get().locationData ?? {}
		if (!lat || !lng) return

		const date = new Date()
		date.setHours(hour)
		date.setMinutes(minute)
		date.setSeconds(0)

		const { sunriseSeconds, sunsetSeconds } = sunSeconds(+lat, +lng, date)

		const isDay = (sunriseSeconds < oldTimeSeconds) && (oldTimeSeconds < sunsetSeconds)

		const light = isDay
			? sunsetSeconds - sunriseSeconds
			: sunriseSeconds + (86400 - sunsetSeconds)

		const num = isDay
			? (oldTimeSeconds - sunriseSeconds) / light
			: modulo(oldTimeSeconds - sunsetSeconds, 86400) / light

		set({
			convertedSolarTime: {
				solarity: isDay ? 'Day' : 'Night',
				number: (num * 10).toFixed(2)
			}
		}, false, 'oldToSolar')
	},

	setSolarity: solarity => {
		set({
			solarity
		}, false, 'setSolarity')

		get().solarToOld()
	},
	setSolarTime: time => {
		set({
			solarTime: time
		}, false, 'setSolarTime')

		get().solarToOld()
	},
	solarToOld: () => {
		const { lat, lng } = get().locationData ?? {}
		if (!lat || !lng) return

		const { sunriseSeconds, sunsetSeconds } = sunSeconds(+lat, +lng)

		const isDay = get().solarity === 'Day'

		const light = isDay
			? sunsetSeconds - sunriseSeconds
			: sunriseSeconds + (86400 - sunsetSeconds)

		const seconds = (isDay ? sunriseSeconds : sunsetSeconds) + light * get().solarTime / 10

		set({
			convertedOldTime: secondsToTime(seconds)
		}, false, 'solarToOld')
	}
})

type Store = State & Action

export const useGlobalStore = create<Store>()(devtools(subscribeWithSelector((...a) => ({
	...stateSlice,
	...actionSlice(...a)
})), { name: 'Store' }))