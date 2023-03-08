interface Time {
	hour: number;
	minute: number;
	seconds?: number;
}

export const timeToSeconds = ({ hour, minute, seconds = 0 }: Time) => {
	return (hour * 3600) + (minute * 60) + seconds
}

const dateToSeconds = (date: Date) => {
	return timeToSeconds({
		hour: date.getHours(),
		minute: date.getMinutes(),
		seconds: date.getSeconds()
	})
}

const unixToSeconds = (unix: number) => {
	return dateToSeconds(new Date(unix))
}

export const stringToSeconds = (stringDate: string) => {
	return unixToSeconds(Date.parse(stringDate))
}

export const secondsToTime = (seconds: number) => {
	return new Date(seconds * 1000).toISOString().slice(11, 19)
}