import { Text } from '@mantine/core'
import { type NextPage } from 'next'
import { api } from '~/utils/api'

const Home: NextPage = () => {

	const hello = api.example.hello.useQuery({ text: 'from tRPC' })

	return (
		<>
			<Text>{hello.isSuccess ? hello.data.greeting : '. . .'}</Text>
		</>
	)
}

export default Home
