import { Autocomplete, type AutocompleteItem, Avatar, Group, Loader, Text } from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { forwardRef, useEffect, type FC } from 'react'
import { useGlobalStore } from '~/utils/state'
import { api } from '~/utils/api'
import { IconFlag } from '@tabler/icons-react'
import useIsMobile from '~/hooks/useIsMobile'

const Location: FC = () => {

	const isMobile = useIsMobile()

	const countryCode = useGlobalStore(state => state.countryCode)
	const geoData = useGlobalStore(state => state.geoData)
	const setGeoData = useGlobalStore(state => state.setGeoData)
	const setTimezoneData = useGlobalStore(state => state.setTimezoneData)

	const [location, setLocation] = useDebouncedState('', 750)

	const autocompleteLocations = api.geonames.autocompleteLocations.useMutation({
		onSuccess: data => {
			if (!data.geodata) return
			setGeoData(data.geodata)
			setTimezoneData(data.timezone)
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
			width: isMobile ? '100%' : '240px'
		}}
		data={geoData.map(location => {
			const locationItemData: LocationItemProps = {
				value: location.name,
				country: `Lat: ${location.lat} / Lng: ${location.lng}`,
				image: `http://purecatamphetamine.github.io/country-flag-icons/3x2/${location.countryCode}.svg`,
				key: `${location.name}/${location.lat}`
			}
			return locationItemData
		})}
		itemComponent={LocationAutocompleteItem}
		rightSection={autocompleteLocations.isLoading ? <Loader size='16px' /> : null}
		error={
			(
				geoData.map(location => location.name.toLowerCase()).includes(location.toLowerCase())
				&& autocompleteLocations.isLoading
			)
			|| !location.length
		}
		icon={geoData[0] ? <Avatar src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${geoData[0].countryCode}.svg`} size={'sm'} /> : <IconFlag />}
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