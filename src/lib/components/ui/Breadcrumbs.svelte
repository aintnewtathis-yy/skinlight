<script>
	import { page } from '$app/stores';

	let { brand, product } = $props();
</script>

<div class="flex items-end gap-2 *:text-textDull">
	<a href="/">Главная</a>
	{#if $page}
		<span>/</span>
		<a href="/catalog">Каталог</a>
	{/if}
	{#if brand}
		<span>/</span>
		<a href={'/catalog/' + brand.href}>{brand.name}</a>
	{/if}
	{#if product}
		<span>/</span>
		<p>{product}</p>
	{/if}
</div>
