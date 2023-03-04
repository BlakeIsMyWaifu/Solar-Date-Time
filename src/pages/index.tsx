import { Button, Group, Modal, Text, TextInput, Title } from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { useInputState } from '@mantine/hooks'
import { type NextPage } from 'next'
import { api } from '~/utils/api'

const Home: NextPage = () => {

	const [location, setLocation] = useInputState('')
	const [time, setTime] = useInputState('')

	const oldToSolar = api.geonames.oldToSolar.useMutation()

	return (
		<Modal
			centered
			opened={true}
			onClose={() => undefined}
			withCloseButton={false}
		>
			<Title>Old Time to Solar Time</Title>

			<Group align='end'>
				<TextInput
					label='Location'
					value={location}
					onChange={setLocation}
				/>
				<TimeInput
					label='Time'
					value={time}
					onChange={setTime}
				/>
				<Button
					color='gray'
					onClick={() => {
						const [hour, minute] = time.split(':')
						oldToSolar.mutate({
							location,
							oldTime: [+(hour ?? 0), +(minute ?? 0)]
						})
					}}
				>Submit</Button>
			</Group>

			<Text>{oldToSolar.data?.sol} {oldToSolar.data?.num}</Text>
		</Modal>
	)
}

export default Home
