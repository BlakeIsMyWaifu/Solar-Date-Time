import { TimeInput } from '@mantine/dates'
import { useGlobalStore } from '~/utils/state'
import { type FC } from 'react'

const fill = (num: number) => (`00${num}`).slice(-2)

const OldTimeInput: FC = () => {

	const { hour, minute } = useGlobalStore(state => state.oldTime)
	const setTime = useGlobalStore(state => state.setOldTime)

	return <TimeInput
		required
		label='Time'
		value={`${fill(hour)}:${fill(minute)}`}
		onChange={event => setTime(event.currentTarget.value)}
	/>
}

export default OldTimeInput