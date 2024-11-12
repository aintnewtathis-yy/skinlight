import { CMS_URL } from '$lib/globals.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals, params, fetch }) {
	if (!params.documentId) {
		error(404, 'Заказ не найден');
	}
	const population = ['?populate[products][populate][product][populate][thumbnail]=*'];


	try {
		const req = await fetch(`${CMS_URL}/api/orders/${params?.documentId}${population.join('')}`);
		const res = await req.json();

		if (res.error) {
			error(404);
		}

		return {
			user: locals.user,
			order: res.data
		};
	} catch (err) {
		error(404, 'Заказ недоступен');
	}
}
