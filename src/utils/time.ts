import { getTimes } from './suncalc'

export interface Time {
	hour: number;
	minute: number;
	seconds?: number;
}

export const timeToSeconds = ({ hour, minute, seconds = 0 }: Time) => {
	return (hour * 3600) + (minute * 60) + seconds
}

export const dateToSeconds = (date: Date) => {
	return timeToSeconds({
		hour: date.getHours(),
		minute: date.getMinutes(),
		seconds: date.getSeconds()
	})
}

export const secondsToTime = (seconds: number) => {
	return new Date(seconds * 1000).toISOString().slice(11, 19)
}

export const sunSeconds = (lat: number, lng: number, date?: Date) => {
	const { sunrise, sunset } = getTimes(date ?? new Date(), lat, lng)

	const sunriseSeconds = dateToSeconds(sunrise)
	const sunsetSeconds = dateToSeconds(sunset)

	return {
		sunriseSeconds,
		sunsetSeconds
	}
}