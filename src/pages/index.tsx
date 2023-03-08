import { Box, Group, Paper, Stack } from '@mantine/core'
import { type NextPage } from 'next'
import CountryCode from '~/components/CountryCode'
import Location from '~/components/Location'
import OldTimeInput from '~/components/OldTimeInput'
import SolarityInput from '~/components/SolarityInput'
import SolarTimeInput from '~/components/SolarTimeInput'
import { useGlobalStore } from '~/utils/state'
import Results from '~/components/Results'
import Background from '~/components/Background'
import TimeTitle from '~/components/TimeTitle'
import useIsMobile from '~/hooks/useIsMobile'
import { type CSSProperties } from 'react'

const Home: NextPage = () => {

	const isMobile = useIsMobile()

	const isOldToSolar = useGlobalStore(state => state.isOldToSolar)

	const paperCommonStyle: CSSProperties = {
		zIndex: 100
	}

	const paperDesktopStyle: CSSProperties = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '900px',
		padding: '48px'
	}

	const paperMobileStyle: CSSProperties = {
		width: '100%',
		padding: '12px',
		minHeight: '400px'
	}

	const paperCorrectStyle = isMobile ? paperMobileStyle : paperDesktopStyle

	return (
		<Background>
			<Paper style={{ ...paperCommonStyle, ...paperCorrectStyle }}>
				<Stack align='center' spacing={isMobile ? 0 : 'md'}>
					<TimeTitle />

					<Box component={isMobile ? Stack : Group} style={{
						width: isMobile ? '280px' : 'auto',
						height: isMobile ? '230px' : 'auto'
					}}>

						<CountryCode />

						<Location />

						{isOldToSolar && <OldTimeInput />}

						<Group>
							{!isOldToSolar && <SolarityInput />}

							{!isOldToSolar && <SolarTimeInput />}
						</Group>

					</Box>

					<Results />
				</Stack>
			</Paper>
		</Background>
	)
}

export default Home
