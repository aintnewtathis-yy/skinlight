import { CMS_URL } from '$lib/globals.js';
import { error } from '@sveltejs/kit';
export async function load({ fetch }) {
	try {
		const req = await fetch(`${CMS_URL}/api/getAllCourses`);
		const res = await req.json();

		if (res.error) {
			error(404, 'Ошибка при загрузке');
		}

		return res;
	} catch (err) {
		error(404, 'Ошибка при загрузке');
	}
}


