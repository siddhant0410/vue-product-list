import type { Product } from './types.ts'

export const downloadProductList = async (): Promise<Product[]> => {
	try {
		const json = (await fetch('https://dummyjson.com/products')).json()
		if (Array.isArray(json)) {
			return json.slice(0, 100)
		}
	} catch (error) {
		console.error(error)
	}
	return []
}
