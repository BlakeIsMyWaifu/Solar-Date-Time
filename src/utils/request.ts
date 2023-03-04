import { env } from '~/env.mjs'

const geoAPI = async <T>(params: URLSearchParams, endpoint: string): Promise<T> => {
	params.set('username', env.GEONAME)
	const url = `http://api.geonames.org/${endpoint}?${params.toString()}`
	const data = await fetch(url)
	if (!data.ok) throw new Error(data.statusText)
	return data.json() as Promise<T>
}

interface SearchReturn {
	totalResultsCount: number;
	geonames: Geonames[];
}

interface Geonames {
	adminCode1: string;
	/** Longitude */
	lng: string;
	geonameId: number;
	toponymName: string;
	countryId: string;
	fcl: string;
	population: number;
	countryCode: string;
	name: string;
	fclName: string;
	adminCodes1: {
		ISO3166_2: string;
	};
	countryName: string;
	fcodeName: string;
	adminName1: string;
	/** Latitude */
	lat: string;
	fcode: string;
}

export const searchLocation = async (location: string) => {
	const params = new URLSearchParams()
	params.set('q', location)
	params.set('maxRows', '1')
	const data = await geoAPI<SearchReturn>(params, 'searchJSON')
	return data
}