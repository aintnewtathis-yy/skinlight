import { CMS_URL } from '$lib/globals.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, url }) {
	const currentLimit = url.searchParams.get('pageLimit')
		? Number(url.searchParams.get('pageLimit'))
		: 24;
	const brandSlug = url.pathname.replace('/catalog/', '');
	const categorySlug = url.searchParams.get('categorySlug') ?? '';
	const lineSlug = url.searchParams.get('lineSlug') ?? '';

	const sorting = url.searchParams.get('sorting');
	const maxPrice = url.searchParams.get('maxPrice');
	const minPrice = url.searchParams.get('minPrice');
	let queryParams = [
		`?brandSlug=${brandSlug}`,
		`&limit=${currentLimit}`,
		`&categorySlug=${categorySlug}`,
		`&lineSlug=${lineSlug}`
	];

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
	const slug = `${CMS_URL}/api/products/getBrandCatalog${queryParams.join('')}`;
	try {
		const req = await fetch(slug);
		const res = await req.json();

		if(res.error) {
            error(404, 'Ошибка при загрузке');
        }
		
		return {
			products: res.products,
			categories: res.categories,
			lines: res.lines,
			currentBrand: res.currentBrand,
			pagination: res.pagination,
			minPrice: res.minPrice,
			maxPrice: res.maxPrice
		};
	} catch (err) {
		console.warn(err);
		error(500, {
			message: 'Проблема с загрузкой товаров, попробуйте снова',
			detail: err.message || err
		});
	}
}
