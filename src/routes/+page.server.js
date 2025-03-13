import { CMS_URL } from '$lib/globals.js';
import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
	try {
		const req = await fetch(`${CMS_URL}/api/getHomeData`);
		const res = await req.json();
		return res;
	} catch (err) {
		error(404, 'Ошибка при загрузке');
	}
	return {};
}
