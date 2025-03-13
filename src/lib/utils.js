import { CMS_URL } from '$lib/globals.js';
import { error } from '@sveltejs/kit';

export function scrollTopCatalog() {
	if (document.querySelector('#catalog').getBoundingClientRect().top < window.screenY) {
		window.scrollTo({
			top: document.querySelector('#catalog').getBoundingClientRect().top + window.scrollY - 100,
			behavior: 'instant'
		});
	}
}

export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export const validateData = async (formData, schema) => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);
		return {
			formData: data,
			errors: null
		};
	} catch (err) {
		const errors = err.flatten();
		return {
			formData: body,
			errors
		};
	}
};
