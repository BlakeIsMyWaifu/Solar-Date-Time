import { Group, Avatar, Text, type AutocompleteItem, type SelectItem } from '@mantine/core'
import { forwardRef } from 'react'

export interface LocationItemProps extends AutocompleteItem {
	image: string;
	country: string;
}

export const LocationAutocompleteItem = forwardRef<HTMLDivElement, LocationItemProps>(function Item({ country, value, image, ...other }: LocationItemProps, ref) {
	return (
		<div ref={ref} {...other}>
			<Group noWrap>
				<Avatar src={image} />
				<div>
					<Text>{value.split('__')[0]}</Text>
					<Text size='xs' color='dimmed'>
						{country}
					</Text>
				</div>
			</Group>
		</div>
	)
})

export interface CountryItemProps extends SelectItem {
	image: string;
	country: string;
}

export const CountryAutocompleteItem = forwardRef<HTMLDivElement, LocationItemProps>(function Item({ country, value, image, ...other }: LocationItemProps, ref) {
	return (
		<div ref={ref} {...other}>
			<Group noWrap>
				<Avatar src={image} />
				<div>
					<Text>{value.split('__')[0]}</Text>
					<Text size='xs' color='dimmed'>
						{country}
					</Text>
				</div>
			</Group>
		</div>
	)
})