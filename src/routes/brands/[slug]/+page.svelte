<script>
	import { marked } from 'marked';
	import { CMS_URL } from '$lib/globals.js';
	import HeroBrand from '$lib/components/heroPages/HeroBrand.svelte';
	import LineCatalog from '$lib/components/LineCatalog.svelte';
	import CatalogRow from '$lib/components/global/CatalogRow.svelte';

	let { data } = $props();
	const { brand, products } = data.data;


	const productRowText = {
		title: 'Процукция бренда',
		href: '/catalog/' + brand?.seo?.slug
	};
</script>

<HeroBrand
	title={brand?.brandHero?.title}
	description={brand?.brandHero?.description}
	image={brand?.brandHero?.image}
	slug={brand?.seo?.slug}
/>
<section id="about">
	<div class="container">
		<div class="flex flex-col items-center gap-8 max-md:gap-6">
			<p class="text-center">
				<span class="italic">(</span>
				{brand?.brandAbout?.miniTitle} <span class="italic">)</span>
			</p>
			<h6
				class="w-4/5 text-balance text-center font-serif text-5xl max-lg:w-full max-lg:text-4xl max-md:text-2xl"
			>
				{brand?.brandAbout?.title}
			</h6>
			<div
				class="mt-3 flex w-2/4 flex-col gap-12 max-lg:w-2/3 max-lg:gap-8 max-md:flex max-md:w-full max-md:flex-col max-md:gap-6"
			>
				<img
					src={brand.brandAbout?.image?.formats?.large?.url
						? CMS_URL + brand?.brandAbout?.image?.formats?.large?.url
						: CMS_URL + brand?.brandAbout?.image?.url}
					width={brand?.brandAbout?.image?.width}
					height={brand?.brandAbout?.image?.height}
					alt={brand?.brandAbout?.image?.allternativeText}
					class="h-full rounded max-md:aspect-[4/3]"
				/>
				<div class="flex flex-col gap-6">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="flex flex-col gap-6 overflow-hidden max-md:gap-4">
						<p class="font-serif text-2xl max-lg:text-xl">
							{brand?.brandAbout?.descriptionTitle}
						</p>
						<div class="flex flex-col gap-2 *:max-xl:text-sm max-lg:text-sm">
							{@html marked.parse(brand?.brandAbout?.descriptionText)}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<LineCatalog
	title={brand?.shownLine?.title}
	image={brand?.shownLine?.image}
	products={brand?.shownLine?.products}
	brandSlug={brand?.seo?.slug}
	slug={brand?.shownLine?.seo?.slug}
/>
<CatalogRow content={productRowText} {products} />
