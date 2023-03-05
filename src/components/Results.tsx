import { Group, Text } from '@mantine/core'
import { type FC } from 'react'
import { useGlobalStore } from '~/utils/state'

const Results: FC = () => {

	const isOldToSolar = useGlobalStore(state => state.isOldToSolar)

	return isOldToSolar ? <SolarTimeResults /> : <OldTimeResults />
}

const SolarTimeResults: FC = () => {

	const convertedSolarTime = useGlobalStore(state => state.convertedSolarTime)

	return convertedSolarTime ? (
		<Group>
			<Text>Solarity: {convertedSolarTime.solarity}</Text>
			<Text>Number: {convertedSolarTime.number}</Text>
		</Group>
	) : <Text>Awaiting Input</Text>
}

const OldTimeResults: FC = () => {

	const convertedOldTime = useGlobalStore(state => state.convertedOldTime)

	return convertedOldTime ? (
		<Group>
			<Text>{convertedOldTime}</Text>
		</Group>
	) : <Text>Awaiting Input</Text>
}

export default Results