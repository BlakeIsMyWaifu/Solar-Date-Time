import { Group, Select, type SelectItem, Text } from '@mantine/core'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { forwardRef, type ReactNode, type FC } from 'react'
import { useGlobalStore } from '~/utils/state'

const SolarityInput: FC = () => {

	const solarity = useGlobalStore(state => state.solarity)
	const setSolarity = useGlobalStore(state => state.setSolarity)

	const data: SolarityItemProps[] = [
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
	]

	return <Select
		required
		label='Solarity'
		value={solarity}
		onChange={event => setSolarity(event === 'Day' ? 'Day' : 'Night')}
		style={{
			width: '120px'
		}}
		data={data}
		itemComponent={SolaritySelectItem}
		icon={solarity === 'Day' ? <IconSun /> : <IconMoon />}
	/>
}

interface SolarityItemProps extends SelectItem {
	icon: ReactNode;
}

const SolaritySelectItem = forwardRef<HTMLDivElement, SolarityItemProps>(function Item({ value, icon, ...other }: SolarityItemProps, ref) {
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

export default SolarityInput