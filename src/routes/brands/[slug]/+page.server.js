import { CMS_URL } from '$lib/globals.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({fetch, url}) {
    const slug = url.pathname.replace('/brands/', '')

    try {
        const req = await fetch(`${CMS_URL}/api/brand/getBrand?brandSlug=${slug}`)
        const res = await req.json()

        return {
            data: res
        }
    } catch (err) {
        error(404, 'Стрнаица не найдена')
    }
    return {};
};