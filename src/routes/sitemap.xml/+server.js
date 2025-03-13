import { CMS_URL } from '$lib/globals';

const site = 'https://skinlight.ru';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, locals }) {
	const req = await fetch(`${CMS_URL}/api/products/sitemap`);
	const { products, courses, brands } = await req.json();
	const sitemap = (products, courses, brands) => `<?xml version="1.0" encoding="UTF-8" ?>

<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${site}/</loc>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${site}/contacts</loc>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${site}/client</loc>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${site}/about</loc>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
        <loc>${site}/timetable</loc>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
    </url>
    <url>
        <loc>${site}/distributors</loc>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
    </url>
  <url>
    <loc>${site}/legal/offerta</loc>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${site}/legal/policy</loc>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${site}/catalog</loc>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>
  ${brands
		.map(
			(brand) => `
<url>
<loc>${site}/catalog/${brand.seo.slug}</loc>
<changefreq>daily</changefreq>
<lastmod>${brand.updatedAt}</lastmod>
<priority>0.5</priority>
</url>
`
		)
		.join('')}

  ${products
		.map(
			(product) => `
  <url>
    <loc>${site}/catalog/${product.brand?.seo?.slug}/${product.seo.slug}</loc>
    <changefreq>daily</changefreq>
    <lastmod>${product.updatedAt}</lastmod>
    <priority>0.5</priority>
  </url>
  `
		)
		.join('')}


    <url>
        <loc>${site}/courses</loc>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
    </url>
            ${courses
							.map(
								(course) => `
      <url>
        <loc>${site}/courses/${course.seo.slug}</loc>
        <changefreq>daily</changefreq>
        <lastmod>${course.updatedAt}</lastmod>
        <priority>0.5</priority>
      </url>
      `
							)
							.join('')}

                

        
</urlset>`;

	const body = sitemap(products, courses, brands);
	const response = new Response(body);
	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	response.headers.set('Content-Type', 'application/xml');
	return response;
}
