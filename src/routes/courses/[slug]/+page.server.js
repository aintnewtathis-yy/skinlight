import { CMS_URL } from '$lib/globals.js';
import { error, fail } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { courseSignUpSchema } from '$lib/schemas.js';

export async function load({fetch, params}) {
    const slug = params.slug
    try {
		const req = await fetch(`${CMS_URL}/api/getCourseData?slug=${slug}`);
		const res = await req.json();
        if(res.error) {
            error(404, 'Ошибка при загрузке');
        }
		return res;
	} catch (err) {
		error(404, 'Ошибка при загрузке');
	}
};

export const actions = {
	courseSignUp: async ({ request }) => {
		const { formData, errors } = await validateData(await request.formData(), courseSignUpSchema);

		console.log(formData, errors)
		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		

		/* try {
			const response = await fetch(`${CMS_URL}/api/auth/forgot-password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: formData.email
				})
			});
			const data = await response.json();
		} catch (err) {
			console.log('Error: ', err);
			return fail(400, {
				formData,
				errors: err.message
			});
		} */
	}
};