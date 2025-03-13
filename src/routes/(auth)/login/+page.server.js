import { error, fail, redirect } from '@sveltejs/kit';
import { validateData, generateUsername } from '$lib/utils';
import { loginUserSchema } from '$lib/schemas';
import { CMS_URL } from '$lib/globals.js';

export async function load({ locals }) {
	if (locals.user) {
		throw redirect(303, '/profile');
	}
}

export const actions = {
	login: async ({ request, locals, cookies }) => {
		const { formData, errors } = await validateData(await request.formData(), loginUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			const response = await fetch(`${CMS_URL}/api/auth/local`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					identifier: formData.identifier,
					password: formData.password
				})
			});
			const data = await response.json();
			if (data.error) {
				if (data.error.message === 'Invalid identifier or password') {
					return fail(400, {
						data: formData,
						loginError: 'Неверные логин или пароль'
					});
				} else {
					return fail(400, {
						data: formData,
						loginError: 'Что-то пошло не так, попробуйте позже'
					});
				}
			}
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
				errors: err.message
			});
		}

		throw redirect(303, '/profile');
	}
};
