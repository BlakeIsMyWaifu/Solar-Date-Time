import { TimeInput } from '@mantine/dates'
import { type FC } from 'react'
import { useGlobalStore } from '~/utils/state'

const OldTimeInput: FC = () => {

	const time = useGlobalStore(state => state.oldTime)
	const setTime = useGlobalStore(state => state.setOldTime)

	return <TimeInput
		required
		label='Time'
		onChange={event => setTime(event.currentTarget.value)}
		error={!time}
	/>
}

export default OldTimeInput