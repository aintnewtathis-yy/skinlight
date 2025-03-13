<script>
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
	import ProductCard from '$lib/components/ui/ProductCard.svelte';
	import PriceFilter from '$lib/components/ui/PriceFilter.svelte';
	import SortFilters from '$lib/components/ui/SortFilters.svelte';
	import { scrollTopCatalog } from '$lib/utils';
	import { page } from '$app/stores';
	import { goto, afterNavigate, beforeNavigate } from '$app/navigation';
	import Seo from '../../lib/components/utils/SEO.svelte';

	let { data } = $props();

	let sidebarData = {
		title: 'Каталог',
		brands: data.brands
	};
	let bottomAnchor;
	let open = $state(false);
	let searchParams = $derived(new URLSearchParams($page.url.search));

	let pagination = $derived(
		searchParams.get('pageLimit') ? parseInt(searchParams.get('pageLimit')) : 24
	);

	let minPriceFilter = $derived(parseInt(searchParams.get('minPrice')) ?? '');
	let maxPriceFilter = $derived(parseInt(searchParams.get('maxPrice')) ?? '');
	let sortFilter = $derived(searchParams.get('sorting') ?? 'default');
	let filteredProducts = $derived.by(() =>
		getFilteredProducts(data.products, sortFilter, minPriceFilter, maxPriceFilter)
	);

	function getFilteredProducts(products, sortFilter, minPriceFilter, maxPriceFilter) {
		if (maxPriceFilter && minPriceFilter) {
			products = products.filter(
				(product) =>
					parseInt(product.priceRUB) >= minPriceFilter &&
					parseInt(product.priceRUB) <= maxPriceFilter
			);
		}

		switch (sortFilter) {
			case 'priceUp':
				return products.sort((a, b) => parseInt(a.priceRUB) - parseInt(b.priceRUB));
			case 'priceDown':
				return products.sort((a, b) => parseInt(b.priceRUB) - parseInt(a.priceRUB));
			case 'old':
				return products.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
			default:
				return products;
		}
	}

	function gotoNextPage() {
		if (maxPriceFilter) {
			searchParams.set('maxPrice', maxPriceFilter);
			searchParams.set('minPrice', minPriceFilter);
		}
		if (sortFilter) {
			searchParams.set('sorting', sortFilter);
		}
		if (data.pagination.total > pagination) {
			searchParams.set('pageLimit', pagination + 24);
		} else if (data.pagination.total < 24) {
			searchParams.set('pageLimit', 24);
			return;
		} else {
			searchParams.set('pageLimit', data.pagination.total);
			return;
		}

		goto(`/catalog?${searchParams.toString()}`, {
			replaceState: true,
			noScroll: true
		});
	}

	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					gotoNextPage();
				}
			},
			{
				rootMargin: '0px 0px 500px 0px'
			}
		);
		observer.observe(bottomAnchor);
		return () => observer.disconnect();
	});
</script>

<Seo
	title={'Каталог'}
	description={"Продукция брендов Ella Bache, Pandhy's, Perron Rigot и Val Mi"}
/>

{#snippet sidebarNav(content)}
	<nav>
		<ul class="-mt-3 flex flex-col pb-5">
			<li
				class=" group h-full w-full flex-grow rounded bg-bgColor transition duration-300 max-lg:-ml-2 max-lg:px-2"
			>
				<a
					onclick={() => {
						scrollTopCatalog();
					}}
					data-sveltekit-noscroll
					class="flex h-full w-full px-2 py-3 max-md:px-0"
					href="#"
				>
					Смотреть всё
				</a>
			</li>
			{#each content.brands as brand}
				<li
					class=" group h-full w-full flex-grow rounded transition duration-300 hover:bg-bgColor max-lg:-ml-2 max-lg:px-2 max-md:hover:bg-white"
				>
					<a
						onclick={() => {
							scrollTopCatalog();
						}}
						data-sveltekit-noscroll
						class="flex h-full w-full px-2 py-3 max-md:px-0"
						href={'/catalog/' + brand.seo.slug}>{brand.name}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
{/snippet}
{#snippet sidebarSnippet(content, sidebarNav)}
	<div
		class="no-scrollbar sticky bottom-5 top-[76px] -ml-2 flex h-fit max-h-[calc(100dvh-76px)] flex-col gap-5"
	>
		<h1 class="ml-2 py-5 text-2xl">{content.title}</h1>
		{@render sidebarNav(content)}
	</div>
{/snippet}

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="fixed inset-0 left-0 top-0 z-10 h-dvh w-screen bg-black/30 backdrop-blur-sm transition duration-300"
	class:pointer-events-all={open}
	class:opacity-0={!open}
	class:pointer-events-none={!open}
	onclick={() => {
		open = false;
	}}
></div>

<section class="pt-6">
	<div class="container">
		<div class="flex flex-col gap-10">
			<div class="max-lg:hidden">
				<Breadcrumbs />
			</div>
			<div class="grid grid-cols-[1fr_4fr] gap-4 max-lg:flex" id="catalog">
				<div class="h-full max-lg:hidden">
					{@render sidebarSnippet(sidebarData, sidebarNav)}
				</div>
				<div class="flex flex-col gap-5">
					<div
						class="sticky top-[76px] flex w-full items-center justify-between bg-white max-lg:relative max-lg:top-auto lg:z-20"
					>
						<div
							class="z-20 flex w-full items-center gap-8 pb-20 pt-5 transition duration-300 max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:z-20 max-lg:h-[calc(100vh-60px)] max-lg:w-full max-lg:flex-col max-lg:items-start max-lg:gap-16 max-lg:overflow-y-auto max-lg:bg-white max-lg:px-5"
							class:max-lg:translate-y-0={open}
							class:max-lg:translate-y-[100%]={!open}
						>
							<p class="-mb-5 flex text-center text-lg lg:hidden">Фильтры</p>
							<button
								type="button"
								class="fixed right-5 top-5 hidden h-6 w-6 p-1 max-lg:flex"
								onclick={() => {
									open = false;
								}}
							>
								<img class="w-full object-contain" src="/cross.svg" alt="cross icon" />
							</button>
							<PriceFilter maxPrice={data.maxPrice} />
							<SortFilters />
							<div class="flex w-full flex-col gap-8 lg:hidden">
								<p class=" max-lg:text-lg">Категории</p>
								{@render sidebarNav(sidebarData)}
							</div>
						</div>
						<h1 class="hidden font-serif text-xl max-lg:flex">{sidebarData.title}</h1>
						<button
							type="button"
							class="hidden max-lg:flex"
							onclick={() => {
								open = !open;
							}}
						>
							<img src="filters.svg" alt="filters icon" />
						</button>
					</div>
					<div class="flex flex-col justify-between gap-5">
						{#key filteredProducts}
							<div
								class="grid min-h-[60vh] grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2"
							>
								{#each filteredProducts as product}
									<ProductCard content={product} />
								{/each}
							</div>
						{/key}

						<div bind:this={bottomAnchor}></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
