import { CMS_URL } from '$lib/globals.js';
import { error } from '@sveltejs/kit';

export async function load({ locals, params, fetch }) {
	console.log(params, 'params');
	if (!params.documentId) {
		error(404, 'Заказ не найден');
	}
	const population = '?populate[promocode]=*&populate[products][populate][product][populate][thumbnail]=*';

	const req = await fetch(`${CMS_URL}/api/orders/${params?.documentId}${population}`);
	const res = await req.json();

	if (res.error) {
		error(404, 'Заказ недоступен');
	}

	if (res.data.email !== locals.user.email) {
		error(401, 'Заказ недоступен');
	}

	return {
		user: locals.user,
		order: res.data
	};
}
