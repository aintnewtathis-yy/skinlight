import { getContext, onDestroy, onMount, setContext } from 'svelte';
import { writable } from 'svelte/store';

export let popupState = writable(false)

//toast state handler
export class ToastState {
	toasts = $state([]);
	tiastToTimeout = new Map();

	constructor() {
		onDestroy(() => {
			for (const timeout of this.tiastToTimeout.values()) {
				clearTimeout(timeout);
			}
			this.tiastToTimeout.clear();
		});
	}

	add(message, durationMs = 2000) {
		const id = crypto.randomUUID();

		this.toasts.push({
			id,
			message
		});
		this.tiastToTimeout.set(
			id,
			setTimeout(() => {
				this.remove(id);
			}, durationMs)
		);
	}

	remove(id) {
		this.toasts = this.toasts.filter((toast) => toast.id !== id);
	}
}

const TOAST_KEY = Symbol('TOAST');

export function setToastState() {
	return setContext(TOAST_KEY, new ToastState());
}

export function getToastState() {
	return getContext(TOAST_KEY);
}

//cart state handler

export class CartState {
	localStorageCart = null;
	products = $state([]);
	total = $state(this.products.reduce((sum, product) => sum + product.quantity, 0));

	constructor() {
		onMount(() => {
			this.localStorageCart = JSON.parse(localStorage.getItem('cartProducts')) ?? [];
			this.products = this.localStorageCart;
		});

		$effect(() => {
			localStorage.setItem('cartProducts', JSON.stringify(this.products));
		});
	}

	add(documentId, brand, name, quantity, priceRUB, priceRUBOpt, thumbnail, shortDesc, seo, SKU) {
		const matchingProduct = this.products.filter((product) => product.documentId === documentId);
		if (matchingProduct.length === 0) {
			this.products.push({
				documentId,
				brand,
				name,
				quantity,
				priceRUB,
				priceRUBOpt,
				thumbnail,
				shortDesc,
				seo,
				SKU
			});
		} else {
			matchingProduct[0].quantity++;
		}
	}

	remove(documentId) {
		this.products = this.products.filter((product) => product.documentId !== documentId);
	}
}

const CART_KEY = Symbol('CART');

export function setCartState() {
	return setContext(CART_KEY, new CartState());
}

export function getCartState() {
	return getContext(CART_KEY);
}

//wishlist state handler

export class WishlistState {
	localStorageWishlist = null;
	products = $state([]);

	constructor() {
		onMount(() => {
			this.localStorageWishlist = JSON.parse(localStorage.getItem('wishlistProducts')) ?? [];
			this.products = this.localStorageWishlist;
		});

		$effect(() => {
			localStorage.setItem('wishlistProducts', JSON.stringify(this.products));
		});
	}

	add(documentId, brand, name, quantity, priceRUB, priceRUBOpt, thumbnail, shortDesc, seo, SKU) {
		const matchingProduct = this.products.filter((product) => product.documentId === documentId);
		if (matchingProduct.length === 0) {
			this.products.push({
				documentId,
				brand,
				name,
				quantity,
				priceRUB,
				priceRUBOpt,
				thumbnail,
				shortDesc,
				seo,
				SKU
			});
		} else {
			matchingProduct[0].quantity++;
		}
	}

	remove(documentId) {
		this.products = this.products.filter((product) => product.documentId !== documentId);
	}
}

const WISHLIST_KEY = Symbol('WHISHLIST');

export function setWishlistState() {
	return setContext(WISHLIST_KEY, new WishlistState());
}

export function getWishlistState() {
	return getContext(WISHLIST_KEY);
}
