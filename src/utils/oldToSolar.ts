import { modulo } from './maths'
import { getLocationCords } from './geoData'
import { sunSeconds, timeToSeconds, type Time } from './time'

export default async (time: Time, location: string | [number, number]) => {

	const oldTimeSeconds = timeToSeconds(time)

	const { lat, lng } = await getLocationCords(location)

	const date = new Date()
	date.setHours(time.hour)
	date.setMinutes(time.minute)
	date.setSeconds(time.seconds ?? 0)

	const { sunriseSeconds, sunsetSeconds } = sunSeconds(lat, lng, date)

	const isDay = (sunriseSeconds < oldTimeSeconds) && (oldTimeSeconds < sunsetSeconds)

	const light = isDay
		? sunsetSeconds - sunriseSeconds
		: sunriseSeconds + (86400 - sunsetSeconds)

	const num = isDay
		? (oldTimeSeconds - sunriseSeconds) / light
		: modulo(oldTimeSeconds - sunsetSeconds, 86400) / light

	return {
		sol: isDay ? 'Day' : 'Night',
		num: (num * 10).toFixed(2)
	}
}