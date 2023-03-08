import { useMediaQuery } from '@mantine/hooks'

const useIsMobile = () => {
	return !useMediaQuery('(min-width: 768px)')
}

export default useIsMobile