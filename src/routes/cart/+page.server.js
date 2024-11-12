import { CMS_URL } from '$lib/globals.js';
import { redirect, fail } from '@sveltejs/kit';
import { cartDataSchema } from '$lib/schemas';

export async function load({ locals }) {
	return {
		user: locals.user
	};
}

export const actions = {
	buy: async ({ request }) => {
		let url;
		const formData = await request.formData();

		const cartData = JSON.parse(formData.get('cartData'));

		try {
			const validatedData = cartDataSchema.parse(cartData.userData);

			const response = await fetch(`${CMS_URL}/api/getOrderRequest`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					data: cartData
				})
			});
			const responseData = await response.json();
			url = responseData.url;
		} catch (err) {
			const errors = err.flatten();
			console.log(errors);
			return fail(400, {
				formData: cartData,
				errors: errors.fieldErrors
			});
		}

		redirect(303, url);
	}
};
