<script>
	import '../app.css';
	import '@splidejs/svelte-splide/css/core';
	import Header from '$lib/components/global/Header.svelte';


	let { data, children } = $props();

	
</script>


<Header />
<main class="mt-[76px] max-md:mt-0">
	{@render children()}
</main>


