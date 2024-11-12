import { error, fail, redirect } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { updatePasswordSchema } from '$lib/schemas';
import { CMS_URL } from '$lib/globals.js';

export async function load({ locals, url }) {
	const resetCode = url.searchParams.get('code');

	if (resetCode) {
		return {
			resetCode: resetCode
		};
	} else {
		error(403, 'Нет проверочного кода, отправленного на email');
	}
	return resetCode;
}

export const actions = {
	newPassword: async ({ request, locals, cookies, url }) => {
		const initialFormData = await request.formData();
		const { formData, errors } = await validateData(initialFormData, updatePasswordSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		const response = await fetch(`${CMS_URL}/api/auth/reset-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				code: formData.code,
				password: formData.password,
				passwordConfirmation: formData.passwordConfirm
			})
		});
		const data = await response.json();

		if (data.error) {
			error(400, 'Произошла ошибка');
		}

		throw redirect(303, '/login');
	}
};
