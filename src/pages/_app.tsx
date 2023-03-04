import { MantineProvider } from '@mantine/core'
import { type AppProps, type AppType } from 'next/app'
import Head from 'next/head'

import { api } from '~/utils/api'

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>Solar Date Time</title>
				<link rel='shortcut icon' href='/favicon.ico' />
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
				<meta charSet='UTF-8' />
			</Head>

			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: 'dark'
				}}
			>

				<Component {...pageProps} />

			</MantineProvider>
		</>
	)
}

export default api.withTRPC(MyApp)
