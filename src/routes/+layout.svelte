<script>
	import '../app.css';
	import '@splidejs/svelte-splide/css/core';
	import Header from '$lib/components/global/Header.svelte';

	import { afterNavigate } from '$app/navigation';

	let { data, children } = $props();

	afterNavigate(() => {
		window.scrollTo(0)
	});
</script>

<Header />
<main class="mt-[76px] max-md:mt-0">
	{@render children()}
</main>
