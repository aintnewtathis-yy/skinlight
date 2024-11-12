import { error, fail, redirect } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { registerUserSchema } from '$lib/schemas';
import { CMS_URL } from '$lib/globals.js';

export async function load({ locals }) {
	if (locals.user) {
		throw redirect(303, '/profile');
	}
}

export const actions = {
	register: async ({ request, locals, cookies }) => {
		const { formData, errors } = await validateData(await request.formData(), registerUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			const response = await fetch(`${CMS_URL}/api/auth/local/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: formData.email,
					email: formData.email,
					password: formData.password
				})
			});
			const data = await response.json();
			if (data.jwt && data.user) {
				locals.jwt = data.jwt;
				locals.user = data.user;
				cookies.set('Authorization', `Bearer ${data.jwt}`, {
					path: '/',
					httpOnly: true,
					path: '/',
					secure: true,
					maxAge: 60 * 60 * 24 * 30
				});
			}
		} catch (err) {
			console.log('Error: ', err);
			return fail(400, {
				formData,
				registerFailed: true,
				errors: err.message
			});
		}

		throw redirect(303, '/profile');
	}
};
