import { Group, Avatar, Text, type AutocompleteItem, type SelectItem } from '@mantine/core'
import { forwardRef, type ReactNode } from 'react'

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
					<Text>{value}</Text>
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

export const CountrySelectItem = forwardRef<HTMLDivElement, LocationItemProps>(function Item({ country, value, image, ...other }: LocationItemProps, ref) {
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

export interface SolarityItemProps extends SelectItem {
	icon: ReactNode;
}

export const SolaritySelectItem = forwardRef<HTMLDivElement, LocationItemProps>(function Item({ value, icon, ...other }: LocationItemProps, ref) {
	return (
		<div ref={ref} {...other}>
			<Group noWrap>
				{icon}
				<div>
					<Text>{value}</Text>
				</div>
			</Group>
		</div>
	)
})