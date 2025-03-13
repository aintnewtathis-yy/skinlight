<script>
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import { scrollTopCatalog } from '$lib/utils';

	let btn;
	let variants = [
		{
			label: 'По умолчанию',
			slug: 'default'
		},
		{
			label: 'По возрастанию цены',
			slug: 'priceUp'
		},
		{
			label: 'По убыванию цены',
			slug: 'priceDown'
		},
		{
			label: 'Сначала старые',
			slug: 'old'
		}
	];
	let searchParams = $derived(new URLSearchParams($page.url.search))
	let currentVariant = $state(variants.find((element) => element.slug === searchParams.get('sorting'))?.label ?? variants[0].label);
	let open = $state(false);

	function updateUrl(value) {
		const params = new URLSearchParams($page.url.search);
		params.set('sorting', value);
		params.set('pageLimit', 24);
		goto(`?${params.toString()}`, { replaceState: true, noScroll: true });
		scrollTopCatalog()
	}

	$effect(() => {
		if (window.innerWidth < 1024) {
			open = true;
		}
	});
</script>

<svelte:window
	onclick={(e) => {
		if (window.innerWidth > 1024) {
			if (e.target !== btn && !btn.contains(e.target)) {
				open = false;
			}
		}
	}}
/>

<div
	class="z-10 ml-auto max-lg:m-0 max-lg:flex max-lg:w-full max-lg:flex-col max-lg:gap-2"
	bind:this={btn}
>
	<button
		class="flex items-center gap-2 rounded-sm px-3 py-2 transition duration-300 hover:bg-bgColor focus:bg-bgColor active:bg-bgColor max-lg:p-0"
		type="button"
		aria-label="filter"
		onclick={() => {
			if (window.innerWidth > 1024) {
				open = !open;
			}
		}}
	>
		<span class="leading-none lg:hidden">Сортировка:</span>
		<span class="leading-none">{currentVariant}</span>
		<img
			src="/arrow-filter.svg"
			alt="arrow icon"
			class="transition duration-300 max-lg:hidden"
			class:rotate-180={open}
		/>
	</button>
	<div
		class="absolute right-0 top-[120%] flex flex-col gap-4 rounded border border-borderColor bg-white p-4 shadow transition duration-300 max-lg:relative max-lg:top-0 max-lg:w-full max-lg:gap-2 max-lg:border-0 max-lg:px-0 max-lg:shadow-none"
		class:opacity-0={!open}
		class:opacity-100={open}
		class:translate-y-0={open}
		class:translate-y-4={!open}
		class:pointer-events-none={!open}
		class:pointer-events-auto={open}
	>
		{#each variants as variant}
			<button
				class="whitespace-nowrap text-start max-lg:-ml-2 max-lg:w-full max-lg:px-2 max-lg:py-3"
				class:max-lg:bg-bgColor={currentVariant === variant.label}
				onclick={() => {
					if (window.innerWidth > 1024) {
						currentVariant = variant.label;
						open = false;
						updateUrl(variant.slug);
					} else {
						currentVariant = variant.label;
						updateUrl(variant.slug);
					}
				}}
			>
				{variant.label}
			</button>
		{/each}
	</div>
</div>
