export interface Time {
	hour: number;
	minute: number;
	seconds?: number;
}

export const timeToSeconds = ({ hour, minute, seconds = 0 }: Time) => {
	return (hour * 3600) + (minute * 60) + seconds
}