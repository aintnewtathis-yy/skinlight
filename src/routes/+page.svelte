<script>
	import Hero from '$lib/components/main-page/Hero.svelte';
	import CatalogRow from '$lib/components/global/CatalogRow.svelte';
	import LineCatalog from '$lib/components/LineCatalog.svelte';
	import Advantages from '$lib/components/main-page/Advantages.svelte';
	import Brands from '$lib/components/main-page/Brands.svelte';
	import CoursesCta from '$lib/components/main-page/CoursesCta.svelte';
	import AboutBlock from '$lib/components/main-page/AboutBlock.svelte';
	import Seo from '../lib/components/utils/SEO.svelte';

	let { data } = $props();
	const sales = {
		title: 'Новинки',
		href: '/catalog'
	};

</script>

<Seo
	title={data?.homeData?.seo?.title}
	description={data?.homeData?.seo?.description}
	image={data?.homeData?.seo?.image}
/>

{#if data?.homeData?.heroSlider}
	<Hero sliderContent={data?.homeData?.heroSlider} />
{/if}

<Advantages />

{#if data?.homeData?.shownLine}
	<LineCatalog
		title={data?.homeData?.shownLine?.name}
		image={data?.homeData?.shownLine?.image}
		products={data?.homeData?.shownLine?.products}
		brandSlug={data?.homeData?.shownLine?.brand?.seo.slug}
		slug={data?.homeData?.shownLine?.seo?.slug}
	/>
{/if}

<CoursesCta />

{#if data?.products}
	<CatalogRow content={sales} products={data?.products} />
{/if}

{#if data?.homeData?.homeBrands}
	<Brands brands={data?.homeData?.homeBrands} />
{/if}

{#if data?.homeData?.heroAbout}
	<AboutBlock content={data?.homeData?.heroAbout} />
{/if}
