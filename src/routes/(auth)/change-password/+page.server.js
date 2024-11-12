import { error, fail, redirect } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { changePasswordSchema } from '$lib/schemas';
import { CMS_URL } from '$lib/globals.js';

export async function load({ locals, url, params }) {
	try {
		if(url.searchParams.get('code')){
			return
		}
		console.log(url.searchParams.get('code'))
	} catch (err) {
		console.warn(err)
	}
}

export const actions = {
	changePassword: async ({ request }) => {
		const { formData, errors } = await validateData(await request.formData(), changePasswordSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			const response = await fetch(`${CMS_URL}/api/auth/forgot-password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: formData.email,
				})
			});
			const data = await response.json();
		} catch (err) {
			console.log('Error: ', err);
			return fail(400, {
				formData,
				errors: err.message
			});
		}
	}
};
