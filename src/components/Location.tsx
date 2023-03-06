import { Autocomplete, type AutocompleteItem, Avatar, Group, Loader, Text } from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { forwardRef, useEffect, type FC } from 'react'
import { useGlobalStore } from '~/utils/state'
import { api } from '~/utils/api'
import { IconFlag } from '@tabler/icons-react'

const Location: FC = () => {

	const countryCode = useGlobalStore(state => state.countryCode)
	const locationData = useGlobalStore(state => state.locationData)
	const setGeoData = useGlobalStore(state => state.setGeoData)

	const [location, setLocation] = useDebouncedState('', 750)

	const autocompleteLocations = api.geonames.autocompleteLocations.useMutation({
		onSuccess: data => {
			setGeoData(data)
		}
	})

	useEffect(() => {
		autocompleteLocations.mutate({
			location: location,
			countryCode: countryCode?.length ? countryCode : undefined
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location, countryCode])

	return <Autocomplete
		required
		label='Location'
		onChange={setLocation}
		style={{
			width: '240px'
		}}
		data={autocompleteLocations.isSuccess ? autocompleteLocations.data.map(location => {
			const locationData: LocationItemProps = {
				value: location.name,
				country: `Lat: ${location.lat} / Lng: ${location.lng}`,
				image: `http://purecatamphetamine.github.io/country-flag-icons/3x2/${location.countryCode}.svg`,
				key: `${location.name}/${location.lat}`
			}
			return locationData
		}) : []}
		itemComponent={LocationAutocompleteItem}
		rightSection={autocompleteLocations.isLoading ? <Loader size='16px' /> : null}
		error={
			(
				!autocompleteLocations.data?.map(location => location.name.toLowerCase()).includes(location.toLowerCase())
				&& !autocompleteLocations.isLoading
			)
			|| !location.length
		}
		icon={locationData ? <Avatar src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${locationData.countryCode}.svg`} size={'sm'} /> : <IconFlag />}
	/>
}

interface LocationItemProps extends AutocompleteItem {
	image: string;
	country: string;
}

const LocationAutocompleteItem = forwardRef<HTMLDivElement, LocationItemProps>(function Item({ country, value, image, ...other }: LocationItemProps, ref) {
	return (
		<div ref={ref} {...other}>
			<Group noWrap>
				<Avatar src={image} />
				<div>
					<Text>{value}</Text>
					<Text size='xs' color='dimmed'>
						{country}
					</Text>
				</div>
			</Group>
		</div>
	)
})

export default Location