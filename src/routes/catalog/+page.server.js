import { CMS_URL } from '$lib/globals.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, url }) {
	const currentLimit = url.searchParams.get('pageLimit')
		? Number(url.searchParams.get('pageLimit'))
		: 24;
	const sorting = url.searchParams.get('sorting');
	const maxPrice = url.searchParams.get('maxPrice');
	const minPrice = url.searchParams.get('minPrice');
	const queryParams = [`?start=0`, `&limit=${currentLimit}`];

	if (sorting) {
		switch (sorting) {
			case 'priceUp':
				queryParams.push(`&sort=priceRUB`);
				break;
			case 'priceDown':
				queryParams.push(`&sort=priceRUB:desc`);
				break;
			case 'old':
				queryParams.push(`&sort=createdAt:desc`);
				break;
			default:
				break;
		}
	}
	if (maxPrice && minPrice) {
		queryParams.push(
			`&filters[priceRUB][$between][0]=${minPrice}&filters[priceRUB][$between][1]=${maxPrice}`
		);
	}
	const slug = `${CMS_URL}/api/products/getCatalogData${queryParams.join('')}`;

	try {
		const req = await fetch(slug);
		const res = await req.json();

		if (res.error) {
			error(404);
		}
		return { 
			products: res.products,
			brands: res.brands,
			pagination: res.pagination,
            minPrice: res.minPrice,
            maxPrice: res.maxPrice,
		 };
	} catch (err) {
		console.warn(err);
		error(500, {
			message: 'Проблема с загрузкой товаров, попробуйте снова',
			detail: err.message || err
		});
	}
}
