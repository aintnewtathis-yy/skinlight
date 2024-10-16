<script>
	import { page } from '$app/stores';

    let {title, description, image, CMS_URL} = $props()
</script>

<svelte:head>
    {#if title}
	    <title>{title}</title>
	    <meta name="og:title" content={title}> 
    {/if}

    {#if description}
        <meta name="description" content={description}> 
        <meta name="og:description" content={description}> 
    {/if}

    {#if image}
        <meta property="og:image" content={CMS_URL + image.formats.medium.url}>
    {/if}

	<meta name="og:url" content={$page.url.href}>
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Bazhenov Concrete">
    <meta name="application-name" content="Bazhenov Concrete">
    <meta name="msapplication-starturl" content={$page.url.origin}>
</svelte:head>