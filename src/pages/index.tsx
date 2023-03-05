import { Autocomplete, Avatar, Button, Group, Loader, Select, Stack, Text, Title } from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { useDebouncedState, useInputState } from '@mantine/hooks'
import { type NextPage } from 'next'
import { useEffect } from 'react'
import { CountryAutocompleteItem, type CountryItemProps, LocationAutocompleteItem, type LocationItemProps } from '~/components/AutocompleteItems'
import { api } from '~/utils/api'
import { countryCodes } from '~/utils/request'

const Home: NextPage = () => {

	const [countryCode, setCountryCode] = useInputState<string | null>(null)
	const [location, setLocation] = useDebouncedState('', 750)
	const [time, setTime] = useInputState('')

	const oldToSolar = api.geonames.oldToSolar.useMutation()

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
			<Title>Old Time to Solar Time</Title>

			<Group align='end'>
				<Select
					searchable
					allowDeselect
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
					itemComponent={CountryAutocompleteItem}
					icon={<Avatar src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode ?? ''}.svg`} size={'sm'} />}
				/>
				<Autocomplete
					label='Location'
					onChange={setLocation}
					style={{
						width: '240px'
					}}
					data={autocompleteLocation.isSuccess ? autocompleteLocation.data.map(location => {
						const locationData: LocationItemProps = {
							value: location.name,
							country: location.countryName,
							image: `http://purecatamphetamine.github.io/country-flag-icons/3x2/${location.countryCode}.svg`,
							key: `${location.name}/${location.lat}`
						}
						return locationData
					}) : []}
					itemComponent={LocationAutocompleteItem}
					rightSection={autocompleteLocation.isLoading ? <Loader size='16px' /> : null}
					error={!autocompleteLocation.data?.map(location => location.name).includes(location) && !autocompleteLocation.isLoading}
				/>
				<TimeInput
					label='Time'
					value={time}
					onChange={setTime}
					error={!time.split(':')[1]}
				/>
				<Button
					color='gray'
					onClick={() => {
						const [hour, minute] = time.split(':')
						if (!minute) return
						oldToSolar.mutate({
							location,
							oldTime: [+(hour ?? 0), +(minute ?? 0)]
						})
					}}
				>Submit</Button>
			</Group>

			<Text>{oldToSolar.data?.sol} {oldToSolar.data?.num}</Text>
		</Stack>
	)
}

export default Home
