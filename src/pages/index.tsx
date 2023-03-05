import { ActionIcon, Group, Stack, Title } from '@mantine/core'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { type NextPage } from 'next'
import CountryCode from '~/components/CountryCode'
import Location from '~/components/Location'
import OldTimeInput from '~/components/OldTimeInput'
import SolarityInput from '~/components/SolarityInput'
import SolarTimeInput from '~/components/SolarTimeInput'
import { useGlobalStore } from '~/utils/state'
import Results from '~/components/Results'

const Home: NextPage = () => {

	const isOldToSolar = useGlobalStore(state => state.isOldToSolar)
	const toggleConverter = useGlobalStore(state => state.toggleConverter)

	return (
		<Stack
			align='center'
			justify='center'
			style={{
				height: '100vh'
			}}
		>

			<Group>
				<Title>Old Time</Title>
				<ActionIcon variant='light' onClick={() => toggleConverter()}>
					{isOldToSolar ? <IconArrowRight /> : <IconArrowLeft />}
				</ActionIcon>
				<Title>Solar Decimal Time</Title>
			</Group>

			<Group align='end'>

				<CountryCode />

				<Location />

				{isOldToSolar && <OldTimeInput />}

				{!isOldToSolar && <SolarityInput />}

				{!isOldToSolar && <SolarTimeInput />}

			</Group>

			<Results />

		</Stack>
	)
}

export default Home
