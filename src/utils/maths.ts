export const modulo = (num: number, mod: number) => {
	return ((num % mod) + mod) % mod
}