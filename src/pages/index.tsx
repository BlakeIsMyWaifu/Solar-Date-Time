import { ActionIcon, Autocomplete, Avatar, Button, Group, Loader, Select, Stack, Title, Text, NumberInput } from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import { IconArrowLeft, IconArrowRight, IconMoon, IconSun } from '@tabler/icons-react'
import { type NextPage } from 'next'
import { TimeInput } from '@mantine/dates'
import { useDebouncedState, useInputState } from '@mantine/hooks'
import { useEffect } from 'react'
import { CountrySelectItem, type CountryItemProps, LocationAutocompleteItem, type LocationItemProps, SolaritySelectItem } from '~/components/AutocompleteItems'
import { api } from '~/utils/api'
import { countryCodes } from '~/utils/geoData'

const Home: NextPage = () => {

	const [isOldToSolar, toggleIsOldToSolar] = useToggle([true, false])

	const [countryCode, setCountryCode] = useInputState<string | null>(null)
	const [location, setLocation] = useDebouncedState('', 750)

	const [time, setTime] = useInputState('')

	const [solarity, setSolarity] = useInputState<'Day' | 'Night'>('Day')
	const [solarTime, setSolarTime] = useInputState<number | ''>(0)

	const oldToSolar = api.calculations.oldToSolar.useMutation()
	const solarToOld = api.calculations.solarToOld.useMutation()

	const autocompleteLocation = api.geonames.autocompleteLocation.useMutation()

	useEffect(() => {
		autocompleteLocation.mutate({
			location,
			countryCode: countryCode?.length ? countryCode : undefined
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location, countryCode])

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
				<ActionIcon variant='light' onClick={() => toggleIsOldToSolar()}>
					{isOldToSolar ? <IconArrowRight /> : <IconArrowLeft />}
				</ActionIcon>
				<Title>Solar Decimal Time</Title>
			</Group>

			<Group align='end'>

				<Select
					searchable
					allowDeselect
					label='Country Code'
					onChange={setCountryCode}
					style={{
						width: '160px'
					}}
					data={Object.entries(countryCodes).map(([code, name]) => {
						const countryData: CountryItemProps = {
							value: code,
							image: `http://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`,
							country: name,
							label: code
						}
						return countryData
					})}
					itemComponent={CountrySelectItem}
					icon={<Avatar src={countryCode ? `http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg` : null} size={'sm'} />}
				/>

				<Autocomplete
					required
					label='Location'
					onChange={setLocation}
					style={{
						width: '240px'
					}}
					data={autocompleteLocation.isSuccess ? autocompleteLocation.data.map(location => {
						const locationData: LocationItemProps = {
							value: location.name,
							country: `Lat: ${location.lat} / Lng: ${location.lng}`,
							image: `http://purecatamphetamine.github.io/country-flag-icons/3x2/${location.countryCode}.svg`,
							key: `${location.name}/${location.lat}`
						}
						return locationData
					}) : []}
					itemComponent={LocationAutocompleteItem}
					rightSection={autocompleteLocation.isLoading ? <Loader size='16px' /> : null}
					error={
						!autocompleteLocation.data?.map(location => location.name.toLowerCase()).includes(location.toLowerCase())
						&& !autocompleteLocation.isLoading
						&& !!location.length
					}
				/>

				{
					isOldToSolar && <TimeInput
						required
						label='Time'
						value={time}
						onChange={setTime}
						error={!time.split(':')[1] && !!time.length}
					/>
				}

				{
					!isOldToSolar && <Select
						required
						label='Solarity'
						value={solarity}
						onChange={event => setSolarity(event === 'Day' ? 'Day' : 'Night')}
						style={{
							width: '120px'
						}}
						data={[
							{
								value: 'Day',
								label: 'Day',
								icon: <IconSun />
							},
							{
								value: 'Night',
								label: 'Night',
								icon: <IconMoon />
							}
						]}
						itemComponent={SolaritySelectItem}
						icon={solarity === 'Day' ? <IconSun /> : <IconMoon />}
					/>
				}

				{
					!isOldToSolar && <NumberInput
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

				<Button
					color='gray'
					onClick={() => {
						if (isOldToSolar) {
							const [hour, minute] = time.split(':')
							if (!minute) return
							oldToSolar.mutate({
								location,
								oldTime: [+(hour ?? 0), +(minute ?? 0)]
							})
						} else {
							solarToOld.mutate({
								location,
								solarity,
								solarTime: typeof solarTime === 'number' ? solarTime : 0
							})
						}
					}}
				>Submit</Button>

			</Group>

			<Text>
				{
					isOldToSolar
						? (oldToSolar.data ? `${oldToSolar.data.sol} ${oldToSolar.data.num}` : '. . .')
						: (solarToOld.data ? solarToOld.data : '. . .')
				}
			</Text>
		</Stack>
	)
}

export default Home
