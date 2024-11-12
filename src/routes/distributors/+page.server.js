import { CMS_URL } from '$lib/globals.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	try {
		const req = await fetch(`${CMS_URL}/api/distributors-plural?populate=*`);
		const res = await req.json();

		if (res.error) {
			error(404, 'Ошибка при загрузке');
		}

		return {
			distributors: res.data
		};
	} catch (err) {
		error(404, 'Ошибка при загрузке');
	}
}
