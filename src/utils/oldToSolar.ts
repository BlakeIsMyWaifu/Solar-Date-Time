import { searchLocation } from './request'
import { getTimes } from './suncalc'
import { timeToSeconds, type Time } from './time'

export default async (time: Time, location: string | [number, number]) => {

	const oldTimeSeconds = timeToSeconds(time)

	const locationData = typeof location === 'string' ? await searchLocation(location) : { geonames: [{ lng: location[0], lat: location[1] }] }
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const { lng, lat } = locationData.geonames[0]!

	const date = new Date()
	date.setHours(time.hour)
	date.setMinutes(time.minute)
	date.setSeconds(time.seconds ?? 0)
	const { sunrise, sunset } = getTimes(date, +lat, +lng)

	const sunriseSeconds = timeToSeconds({
		hour: sunrise.getHours(),
		minute: sunrise.getMinutes(),
		seconds: sunrise.getSeconds()
	})

	const sunsetSeconds = timeToSeconds({
		hour: sunset.getHours(),
		minute: sunset.getMinutes(),
		seconds: sunset.getSeconds()
	})

	const isDay = (sunriseSeconds < oldTimeSeconds) && (oldTimeSeconds < sunsetSeconds)

	const light = isDay
		? sunsetSeconds - sunriseSeconds
		: sunriseSeconds + (86400 - sunsetSeconds)

	const num = isDay
		? (oldTimeSeconds - sunriseSeconds) / light
		: ((oldTimeSeconds - sunsetSeconds) % 86400) / light

	return {
		sol: isDay ? 'Day' : 'Night',
		num: (num * 10).toFixed(2)
	}
}