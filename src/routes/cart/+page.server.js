import { CMS_URL } from '$lib/globals.js';
import { redirect, fail } from '@sveltejs/kit';
import { cartDataSchema, promocodeSchema, emailSchema } from '$lib/schemas';

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
            
			return fail(400, {
				formData: cartData,
				errors: errors.fieldErrors
			});
		}

		redirect(303, url);
	},
	getDiscount: async ({ request }) => {
		const formData = await request.formData();
		const promocodeName = formData.get('promocodeName');

		try {
			const validatedData = promocodeSchema.parse(promocodeName);

			const req = await fetch(
				`${CMS_URL}/api/promocode/getDiscount?promocodeName=${validatedData}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			const res = await req.json();

			console.log(res);

			if (res.error) {
				return fail(400, {
					data: {
						promocodeName: promocodeName
					},
					notFound: true
				});
			}

			return {
				promocode: res
			};
		} catch (err) {
			console.log(err);
			const errors = err.flatten();
			console.log(errors);
			return fail(400, {
				formData: {
					promocodeName: promocodeName
				},
				errors: errors.fieldErrors
			});
		}
	},
	massemail: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email');

		try {
			const validatedData = emailSchema.parse(email);

			const req = await fetch(`${CMS_URL}/api/updateEmailsList`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					data: {
						email: email
					}
				})
			});

			const res = await req.json();

			console.log(res);

			if (res.error) {
				return fail(400, {
					data: {
						email: email
					}
				});
			}

			return {
				email: email
			};
		} catch (err) {
			console.log(err);
			const errors = err.flatten();
			console.log(errors);
			return fail(400, {
				formData: {
					email: email
				},
				errors: errors.fieldErrors
			});
		}
	}
};
