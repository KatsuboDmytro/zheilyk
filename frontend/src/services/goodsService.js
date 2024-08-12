import { goodsClient } from '../http/goods/goodsClient.js'

function getItems() {
	return goodsClient.get(`/api/v1/store/items/`)
}

function getOneItem(id) {
	return goodsClient.get(`/api/v1/store/items/${id}`)
}

function putItemAtCart({ item }) {
	return goodsClient.post(`/api/v1/store/basket/`, { item })
}

export const goodsService = { getItems, getOneItem, putItemAtCart }
