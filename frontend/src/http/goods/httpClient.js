import { createClient } from '../index.js'

export const httpClient = createClient()

httpClient.interceptors.response.use(onResponseSuccess, onResponseError)

function onResponseSuccess(res) {
	return res.data
}

async function onResponseError(error) {
	if (error.response.status !== 401) {
		throw error
	}
}
