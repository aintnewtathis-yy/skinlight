import { CMS_URL } from '$lib/globals.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { cartDataSchema, fileSchema } from '$lib/schemas';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, cookies, locals }) {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	const population = [
		'?populate[orders][populate][products][populate][product][populate][thumbnail]=*',
		'&status=published'
	];
	try {
		const response = await fetch(`${CMS_URL}/api/users/me${population.join('')}`, {
			headers: {
				Authorization: cookies.get('Authorization')
			}
		});
		const data = await response.json();
		return {
			user: data
		};
	} catch (err) {
		error(404, 'Пользователь не найден');
	}
}

export const actions = {
	changePersonalInfo: async ({ request, url, cookies }) => {
		const formData = await request.formData();
		const { userData } = JSON.parse(formData.get('userData'));

		try {
			const validatedData = cartDataSchema.parse(userData);

			const response = await fetch(`${CMS_URL}/api/user/me`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: cookies.get('Authorization')
				},
				body: JSON.stringify(userData)
			});

			const responseData = await response.json();

			return {
				formData: validatedData,
				errors: null
			};
		} catch (err) {
			const errors = err.flatten();
			console.log(errors);
			return fail(400, {
				formData: userData,
				errors: errors.fieldErrors
			});
		}
	},
	certificates: async ({ request, cookies }) => {
		const formData = await request.formData();
		const jwt = cookies.get('Authorization')

		const files = formData.getAll('files');

		if (files.length > 5) {
			return fail(400, {
				errors: { certificates: [`Превышен лимит файлов. Максимум 5 файлов.`] }
			});
		}
		try {
			files.forEach((file) => {
				fileSchema.parse({
					certificatesType: file.type,
					certificatesSize: file.size
				});
			});
		} catch (err) {
			const errors = err?.flatten();
			console.log(errors);
			return fail(400, {
				errors: errors.fieldErrors
			});
		}
		try {
			const req = await fetch(`${CMS_URL}/api/user/upload-certificates`, {
				method: 'POST',
				headers: {
					Authorization: jwt
				},
				body: formData
			});
			const res = await req.json();
		} catch (err) {
			console.log(err);
			error(500, err);
		}
	}
};
