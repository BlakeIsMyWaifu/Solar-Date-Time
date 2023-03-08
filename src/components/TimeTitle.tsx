import { Group, Title, ActionIcon, Box, Stack } from '@mantine/core'
import { IconArrowRight, IconArrowLeft, IconArrowDown, IconArrowUp } from '@tabler/icons-react'
import { type FC } from 'react'
import useIsMobile from '~/hooks/useIsMobile'
import { useGlobalStore } from '~/utils/state'

const TimeTitle: FC = () => {

	const isMobile = useIsMobile()

	const isOldToSolar = useGlobalStore(state => state.isOldToSolar)
	const toggleConverter = useGlobalStore(state => state.toggleConverter)

	return (
		<Box
			component={isMobile ? Stack : Group}
			align='center'
			spacing={isMobile ? 0 : 'md'}
		>
			<Title>Old Time</Title>
			<ActionIcon variant='light' onClick={() => toggleConverter()}>
				{isMobile && (isOldToSolar ? <IconArrowDown /> : <IconArrowUp />)}
				{!isMobile && (isOldToSolar ? <IconArrowRight /> : <IconArrowLeft />)}
			</ActionIcon>
			<Title>Solar Decimal Time</Title>
		</Box>
	)
}

export default TimeTitle