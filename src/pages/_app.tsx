import { type AppProps, type AppType } from 'next/app'

import { api } from '~/utils/api'

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />
}

export default api.withTRPC(MyApp)
