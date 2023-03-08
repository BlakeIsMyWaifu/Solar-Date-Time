import { Box, Center, Stack } from '@mantine/core'
import { type ReactNode, type FC, type CSSProperties } from 'react'
import useIsMobile from '~/hooks/useIsMobile'
import { useGlobalStore } from '~/utils/state'

interface BackgroundProps {
	children: ReactNode;
}

const Background: FC<BackgroundProps> = ({ children }) => {

	const isMobile = useIsMobile()

	const convertedSolarity = useGlobalStore(state => state.convertedSolarTime?.solarity)
	const convertedSolarTime = useGlobalStore(state => state.convertedSolarTime?.number) ?? 0

	const selectedSolarity = useGlobalStore(state => state.solarity)
	const selectedSolarTime = useGlobalStore(state => state.solarTime)

	const isOldToSolar = useGlobalStore(state => state.isOldToSolar)

	const solarity = isOldToSolar ? convertedSolarity : selectedSolarity
	const solarTime = isOldToSolar ? convertedSolarTime : selectedSolarTime

	return (
		<Stack spacing={0} style={{
			background: 'linear-gradient(to bottom, #757abf 0%,#8583be 35%,#eab0d1 100%)',
			height: '100vh',
			width: '100vw',
			overflow: 'hidden'
		}}>
			<Box style={{
				position: 'relative',
				height: isMobile ? 'calc(100% - 400px)' : '100%'
			}}>
				<Center style={{
					height: '100%'
				}}>
					<Celestial
						visible={solarity === 'Day'}
						solarTime={solarTime}
						celestialStyle={{
							background: 'orange',
							boxShadow: `
								0 0 10px orange,
								0 0 60px orange,
								0 0 200px yellow,
								inset 0 0 80px yellow
							`
						}}
					/>
					<Celestial
						visible={solarity === 'Night'}
						solarTime={solarTime}
						celestialStyle={{
							background: '#c7cbd0',
							boxShadow: 'inset -25px 0px 0 0px #9098a1'
						}}
					>
						<ul>
							<MoonSpot
								left={25}
								top={60}
								size={50}
							/>
							<MoonSpot
								left={150}
								top={50}
								size={25}
							/>
							<MoonSpot
								left={100}
								top={150}
								size={25}
							/>
							<MoonSpot
								left={50}
								top={150}
							/>
							<MoonSpot
								left={87.5}
								top={16.6}
							/>
							<MoonSpot
								left={114}
								top={80}
							/>
							<MoonSpot
								left={181}
								top={100}
							/>
						</ul>
					</Celestial>
				</Center>

				<Box style={{
					overflow: 'hidden',
					position: 'absolute',
					width: '100%',
					bottom: 0
				}}>
					<svg
						preserveAspectRatio='none'
						viewBox='0 0 1200 120'
						xmlns='http://www.w3.org/2000/svg'
						style={{
							fill: '#043200',
							width: '100%',
							height: 120,
							transform: 'rotate(180deg)'
						}}
					>
						<path
							d='M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z'
							opacity='.25'
						/>
						<path
							d='M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24V0z'
							opacity='.5'
						/>
						<path d='M0 0v5.63C149.93 59 314.09 71.32 475.83 42.57c43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4C827.93 77.22 886 95.24 951.2 90c86.53-7 172.46-45.71 248.8-84.81V0z' />
					</svg>
					<Box style={{
						backgroundColor: '#043200',
						height: isMobile ? '12px' : '120px',
						marginTop: '-12px'
					}} />
				</Box>
			</Box>

			{children}
		</Stack>
	)
}

interface CelestialProps {
	visible: boolean;
	solarTime: number;
	celestialStyle: CSSProperties;
	children?: ReactNode;
}

const Celestial: FC<CelestialProps> = ({ visible, solarTime, celestialStyle, children }) => {

	const isMobile = useIsMobile()

	return visible ? <div style={{
		transformOrigin: 'center center',
		height: isMobile ? 'calc(100% - 50px)' : '80vw',
		width: isMobile ? '50px' : '200px',
		transition: 'rotate 0.75s',
		rotate: `${((solarTime - 10) * 18) + 90}deg`,
		translate: `0 ${isMobile ? 45 : 22.5}%`
	}}>
		<div style={{
			position: 'absolute',
			top: 0,
			left: '50%',
			translate: '-50% 0',
			borderRadius: '50%',
			height: isMobile ? '50px' : '200px',
			width: isMobile ? '50px' : '200px',
			...celestialStyle
		}}>
			{children}
		</div>
	</div> : null
}

interface MoonSpotProps {
	left: number;
	top: number;
	size?: number;
}

const MoonSpot: FC<MoonSpotProps> = ({ left, top, size }) => {

	const isMobile = useIsMobile()
	const normalisedSize = (size ?? 12.5) / (isMobile ? 4 : 1)

	return <li style={{
		position: 'absolute',
		listStyle: 'none',
		background: '#737277',
		borderRadius: '50%',
		left: `${isMobile ? left / 4 : left}px`,
		top: `${isMobile ? top / 4 : top}px`,
		width: `${normalisedSize}px`,
		height: `${normalisedSize}px`,
		boxShadow: 'inset 2.4px -0.8px 0 0px #414043'
	}} />
}

export default Background