<script>
	import { CMS_URL } from '$lib/globals.js';
	import { page } from '$app/stores';

	let { title, description, image } = $props();

	let imageSrc = $state('');

	if(image) {
		if(image.formats.medium) {
			imageSrc = image.formats.medium.url
		} else if(image.formats.thumbnail) {
			imageSrc = image.formats.thumbnail.url
		} else {
			imageSrc = image.url
		}
	}
</script>

<svelte:head>
	{#if title}
		<title>{title}</title>
		<meta name="og:title" content={title} />
	{/if}

	{#if description}
		<meta name="description" content={description} />
		<meta name="og:description" content={description} />
	{/if}

	{#if image}
		<meta property="og:image" content={CMS_URL + imageSrc} />
	{/if}

	<meta name="og:url" content={$page.url.href} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Скин Лайт" />
	<meta name="application-name" content="Скин Лайт" />
	<meta name="msapplication-starturl" content={$page.url.origin} />
</svelte:head>
