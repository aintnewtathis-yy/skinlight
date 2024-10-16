<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

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
			label: 'По новизне',
			slug: 'new'
		}
	];
	let currentVariant = $state(variants[0].label);
	let open = $state(false);

	function updateUrl(value) {
		const params = new URLSearchParams($page.url.search);
		params.set('sorting', value);
		goto(`?${params.toString()}`, { replaceState: true });
	}

	$effect(() => {
		window.addEventListener('click', (e) => {
			if (e.target !== btn && !btn.contains(e.target)) {
				open = false;
			}
		});
	});
</script>

<div class="z-10 ml-auto" bind:this={btn}>
	<button
		class="flex items-center gap-2 rounded-sm px-3 py-2 transition duration-300 hover:bg-bgColor focus:bg-bgColor active:bg-bgColor"
		type="button"
		aria-label="filter"
		onclick={() => {
			open = !open;
		}}
	>
		<span class="leading-none">{currentVariant}</span>
		<img
			src="arrow-filter.svg"
			alt="arrow icon"
			class="transition duration-300"
			class:rotate-180={open}
		/>
	</button>
	<div
		class="absolute right-0 top-[120%] flex flex-col gap-4 rounded border border-borderColor bg-white p-4 shadow transition duration-300"
		class:opacity-0={!open}
		class:opacity-100={open}
		class:translate-y-0={open}
		class:translate-y-4={!open}
		class:pointer-events-none={!open}
		class:pointer-events-auto={open}
	>
		{#each variants as variant}
			<button
				class="whitespace-nowrap text-start"
				onclick={() => {
					currentVariant = variant.label;
					open = false;
					updateUrl(variant.slug);
				}}
			>
				{variant.label}
			</button>
		{/each}
	</div>
</div>
