import { NumberInput } from '@mantine/core'
import { type FC } from 'react'
import { useGlobalStore } from '~/utils/state'

const SolarTimeInput: FC = () => {

	const solarTime = useGlobalStore(state => state.solarTime)
	const setSolarTime = useGlobalStore(state => state.setSolarTime)

	return <NumberInput
		required
		label='Solar Decimal Time'
		value={solarTime}
		onChange={setSolarTime}
		min={0}
		max={10}
		precision={2}
		step={0.5}
		style={{
			width: '140px'
		}}
	/>
}

export default SolarTimeInput