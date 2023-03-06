import { Avatar, Group, Select, type SelectItem, Text } from '@mantine/core'
import { forwardRef, type FC } from 'react'
import { useGlobalStore } from '~/utils/state'
import { countryCodes } from '~/utils/geoData'
import { IconFlag } from '@tabler/icons-react'

const CountryCode: FC = () => {

	const countryCode = useGlobalStore(state => state.countryCode)
	const setCountryCode = useGlobalStore(state => state.setCountryCode)

	return <Select
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
		icon={countryCode ? <Avatar src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`} size={'sm'} /> : <IconFlag />}
	/>
}

interface CountryItemProps extends SelectItem {
	image: string;
	country: string;
}

const CountrySelectItem = forwardRef<HTMLDivElement, CountryItemProps>(function Item({ country, value, image, ...other }: CountryItemProps, ref) {
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

export default CountryCode