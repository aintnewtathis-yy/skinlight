<script>

	import Hero from '$lib/components/main-page/Hero.svelte';
	import CatalogRow from '../lib/components/global/CatalogRow.svelte';
	import LineCatalog from '../lib/components/LineCatalog.svelte';
	import Advantages from '../lib/components/main-page/Advantages.svelte';
	import Brands from '../lib/components/main-page/Brands.svelte';
	import CoursesCta from '../lib/components/main-page/CoursesCta.svelte';
	import AboutBlock from '../lib/components/main-page/AboutBlock.svelte';

	const sales = {
		title: 'Новинки',
		href: '#'
	};
</script>

<Hero />
<Advantages />
<LineCatalog />
<CoursesCta />
<CatalogRow content={sales} />
<Brands />
<AboutBlock />