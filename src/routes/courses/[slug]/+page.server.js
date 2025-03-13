import { CMS_URL } from '$lib/globals.js';
import { error, fail } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { courseSignUpSchema } from '$lib/schemas.js';

export async function load({ fetch, params }) {
	const slug = params.slug;
	try {
		const req = await fetch(`${CMS_URL}/api/getCourseData?slug=${slug}`);
		const res = await req.json();
		if (res.error) {
			error(404, 'Ошибка при загрузке');
		}
		return res;
	} catch (err) {
		error(404, 'Ошибка при загрузке');
	}
}

export const actions = {
	courseSignUp: async ({ request }) => {
		const initialFormData = await request.formData();
		const { formData, errors } = await validateData(initialFormData, courseSignUpSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		const response = await fetch(`${CMS_URL}/api/sendCourseAttendantToAdmin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: formData.name,
				phone: formData.phone,
				course: formData.course
			})
		});

		if (!response.ok) {
			error(response.status, 'Что-то пошло не так');
		} else {
			return 'success';
		}
	}
};
