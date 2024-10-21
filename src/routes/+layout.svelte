<script>
	import '../app.css';
	import '@splidejs/svelte-splide/css/core';
	import Header from '$lib/components/global/Header.svelte';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import Footer from '../lib/components/global/Footer.svelte';

	let { data, children } = $props();

	let currentPath = $page.url.path

	afterNavigate(() => {
		if (currentPath != $page.url.path) {
			window.scrollTo({ top: 0, behavior: 'auto' });
			currentPath = $page.url.path;
		}
	});
</script>

<Header />
<main class="mt-[76px] max-md:mt-0 max-md:mb-36">
	{@render children()}
</main>
<Footer />