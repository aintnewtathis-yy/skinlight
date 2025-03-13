import { CMS_URL } from '$lib/globals.js';
import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
	try {
		const req = await fetch(`${CMS_URL}/api/getContactsData`);
		const res = await req.json();

		if (res.error) {
			error(404, 'Ошибка при загрузке');
		}
        
		return {
			contactsData: res
		};
	} catch (err) {
		error(404, 'Ошибка при загрузке');
	}
}
