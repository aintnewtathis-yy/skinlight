import { setContext, getContext, onDestroy, onMount } from 'svelte';

export class productToast {
	products = $state([]);

	constructor() {}

	add(documentId, title, quantity, price, thumbnail) {
		const id = crypto.randomUUID()
		this.products.push({
			id,
			title,
			quantity,
			price,
			thumbnail
		});
	}

	remove(documentId) {}
}

const CART_KEY = Symbol('CART');

export function setproductToast() {
	return setContext(CART_KEY, new productToast());
}

export function getproductToast() {
	return getContext(CART_KEY);
}
