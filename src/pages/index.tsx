import { type NextPage } from 'next'

import { api } from '~/utils/api'

const Home: NextPage = () => {
	const hello = api.example.hello.useQuery({ text: 'from tRPC' })

	return (
		<>
			<p>{hello.isSuccess ? hello.data.greeting : '. . .'}</p>
		</>
	)
}

export default Home
