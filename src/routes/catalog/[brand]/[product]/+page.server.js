import { CMS_URL } from '$lib/globals.js';
import { error, fail } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { sendMessageSchema } from '$lib/schemas.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, fetch }) {
	const segments = url.pathname.split('/');
	const productSlug = segments[segments.length - 1];
	const slug = `${CMS_URL}/api/products/getProduct?productSlug=${productSlug}`;

	try {
		const req = await fetch(slug);
		const res = await req.json();
		

		if (res.error) {
			error(404, 'Товар не найден');
		}

		return res;
	} catch (err) {
		console.log('product didnt follow');
		error(404, 'Товар не найден');
	}
}

export const actions = {
	sendMessage: async ({ request }) => {
		const { formData, errors } = await validateData(await request.formData(), sendMessageSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		const response = await fetch(`${CMS_URL}/api/sendFormMessageToAdmin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: formData.name,
				phone: formData.phone,
				message: formData.message
			})
		});

		if (response.status === 200) {
			return 'success';
		} else {
			error(400, 'Ошибка в отправлении, попробуйте позже');
		}
	}
};
