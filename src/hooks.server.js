import { CMS_URL } from '$lib/globals';

export const handle = async ({ event, resolve }) => {
	const jwt = event.cookies.get('Authorization');

	console.log(jwt, 'JWT')
	if (jwt) {
		try {
			const userResponse = await fetch(`${CMS_URL}/api/users/me`, {
				headers: {
					Authorization: jwt
				}
			});

			console.log(userResponse, 'userResponse')

			if (userResponse.ok) {
				const userData = await userResponse.json();
				event.locals.user = userData;
				console.log(userData, 'USER LOCALS')
			} else {
				event.cookies.delete('Authorization', { path: '/' });
				event.locals.user = null;
			}
		} catch (error) {
			console.error('Error fetching user data:', error);
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	const response = await resolve(event);
	return response;
};
