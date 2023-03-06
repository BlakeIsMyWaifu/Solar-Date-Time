import { Box, Center } from '@mantine/core'
import { type ReactNode, type FC } from 'react'
import { type Solarity, useGlobalStore } from '~/utils/state'

interface BackgroundProps {
	children: ReactNode;
}

const Background: FC<BackgroundProps> = ({ children }) => {

	const convertedSolarity = useGlobalStore(state => state.convertedSolarTime?.solarity)
	const convertedSolarTime = useGlobalStore(state => state.convertedSolarTime?.number) ?? 0

	const selectedSolarity = useGlobalStore(state => state.solarity)
	const selectedSolarTime = useGlobalStore(state => state.solarTime)

	const isOldToSolar = useGlobalStore(state => state.isOldToSolar)

	const solarity = isOldToSolar ? convertedSolarity : selectedSolarity
	const solarTime = isOldToSolar ? convertedSolarTime : selectedSolarTime

	return (
		<Box component={Center} style={{
			background: 'linear-gradient(to bottom, #757abf 0%,#8583be 35%,#eab0d1 100%)',
			height: '100vh',
			width: '100vw',
			overflow: 'hidden'
		}}>
			<Sun solarity={solarity ?? 'Night'} solarTime={solarTime} />
			<Moon solarity={solarity ?? 'Day'} solarTime={solarTime} />

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
					height: '120px',
					marginTop: '-12px'
				}} />
			</Box>

			{children}
		</Box>
	)
}

interface CelestialProps {
	solarity: Solarity;
	solarTime: number;
}

const Sun: FC<CelestialProps> = ({ solarity, solarTime }) => {
	return solarity === 'Day' ? (
		<div style={{
			// transform: `translate(${(solarTime * 8) - 40}vw, ${((Math.sqrt((solarTime - 5) ** 2) * 16) - 40) * (solarity === 'Day' ? 1 : -1)}vh)`
			transform: 'translateX(-100px) translateY(-50px)',
			transformOrigin: 'bottom center',
			height: '800px',
			transition: 'rotate 1s',
			rotate: `${(solarTime - 5) * 20}deg`
		}}>
			<div style={{
				position: 'absolute',
				display: 'inline-block',
				borderRadius: '50%',
				height: '200px',
				width: '200px',
				background: 'orange',
				boxShadow: `
						0 0 10px orange,
						0 0 60px orange,
						0 0 200px yellow,
						inset 0 0 80px yellow
					`
			}} />
		</div>
	) : null
}

const Moon: FC<CelestialProps> = ({ solarity, solarTime }) => {
	return solarity === 'Night' ? (
		<div style={{
			transform: 'translateX(-100px) translateY(-50px)',
			transformOrigin: 'bottom center',
			height: '800px',
			transition: 'rotate 1s',
			rotate: `${(solarTime - 5) * 20}deg`
		}}>
			<div style={{
				position: 'absolute',
				display: 'inline-block',
				borderRadius: '50%',
				height: '200px',
				width: '200px',
				background: '#c7cbd0',
				boxShadow: 'inset -25px 0px 0 0px #9098a1'
			}}>
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
			</div>
		</div>
	) : null
}

interface MoonSpotProps {
	left: number;
	top: number;
	size?: number;
}

const MoonSpot: FC<MoonSpotProps> = ({ left, top, size }) => {
	return <li style={{
		position: 'absolute',
		listStyle: 'none',
		background: '#737277',
		borderRadius: '50%',
		left: `${left}px`,
		top: `${top}px`,
		width: `${size ?? 12.5}px`,
		height: `${size ?? 12.5}px`,
		boxShadow: 'inset 2.4px -0.8px 0 0px #414043'
	}} />
}

export default Background