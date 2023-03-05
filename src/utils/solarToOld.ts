import { getLocationCords } from './geoData'
import { secondsToTime, sunSeconds } from './time'

export default async (location: string | [number, number], solarity: 'Day' | 'Night', solarTime: number) => {

	const { lat, lng } = await getLocationCords(location)

	const { sunriseSeconds, sunsetSeconds } = sunSeconds(lat, lng)

	const isDay = solarity === 'Day'

	const light = isDay
		? sunsetSeconds - sunriseSeconds
		: sunriseSeconds + (86400 - sunsetSeconds)

	const seconds = (isDay ? sunriseSeconds : sunsetSeconds) + light * solarTime / 10

	return secondsToTime(seconds)
}