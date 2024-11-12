<script>
	import '../app.css';
	import '@splidejs/svelte-splide/css/core';
	import Header from '$lib/components/global/Header.svelte';
	import Footer from '$lib/components/global/Footer.svelte';
	import Toast from '$lib/components/ui/Toast.svelte';
	import { setToastState, setCartState, setWishlistState } from '$lib/globals.svelte';

	let { data, children } = $props();

	
	setToastState()
	setCartState()
	setWishlistState()
</script>

<Header topMenu={data?.topMenu} botMenu={data?.botMenu} />
<main class="mt-[76px] max-md:mb-36 max-md:mt-0">
	<Toast />

	{@render children()}
</main>
<Footer footerNavigation={data?.footerNavigation} />
