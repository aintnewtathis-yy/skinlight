import { CMS_URL } from '$lib/globals.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	try {
		const req = await fetch(`${CMS_URL}/api/getNavigationData`);
		const res = await req.json();

		return {
			botMenu: res.botMenu,
			footerNavigation: res.footerNavigation,
			topMenu: res.topMenu,
			user: locals.user,
		};
	} catch (err) {
		console.error(404, 'Ошибка при загрузке навигации');
	}
}
