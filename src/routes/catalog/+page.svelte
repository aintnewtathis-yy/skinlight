<script>
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
	import ProductCard from '$lib/components/ui/ProductCard.svelte';
	import PriceFilter from '$lib/components/ui/PriceFilter.svelte';
	import SortFilters from '$lib/components/ui/SortFilters.svelte';

	let filters;
	let open = $state(false);

	let sidebar;
	let lastScrollPosition;
	let initialSidebarPosition;
	let pinnedBottom = false;
	let pinnedTop = false;
	let setTop = false;
	let setTopScroll = 0;
	let innerScrollDifference = false;
	let currentFixBot = 0;
	let currentFixBotScroll = 0;
	let scrolledDistanceDown = 0;
	let currentOffsetTop = 0;

	$effect(() => {
		lastScrollPosition = 0;
		initialSidebarPosition = sidebar.getBoundingClientRect().top;
	});

	function sidebarStickyPositionCalculation() {
		if (window.innerWidth < 1025) {
			return;
		}
		currentOffsetTop = sidebar.offsetTop;
		if (lastScrollPosition > window.scrollY) {
			//up
			if (window.scrollY < initialSidebarPosition - 76) {
				/* console.log('#1 t'); */
				sidebar.style.top = `0`;
				sidebar.style.position = 'relative';
			} else if (Math.round(sidebar.getBoundingClientRect().top) >= 76) {
				/* console.log('#2 t'); */
				sidebar.style.top = `${76}px`;
				sidebar.style.position = 'sticky';
				pinnedTop = true;
			} else {
				if (pinnedTop) {
					pinnedBottom = false;
					lastScrollPosition = window.scrollY;
					return;
				}
				/* console.log('#3 t'); */
				sidebar.style.top = `${scrolledDistanceDown}px`;
				sidebar.style.position = 'relative';
			}
			pinnedBottom = false;
			lastScrollPosition = window.scrollY;
		} else {
			//down

			scrolledDistanceDown = currentFixBot ? window.scrollY - currentFixBotScroll : 0;
			const difference = sidebar.offsetHeight - window.innerHeight + initialSidebarPosition;
			pinnedTop = false;

			if (pinnedBottom) {
				lastScrollPosition = window.scrollY;
				return;
			}
			if (sidebar.offsetTop > 0) {
				/* console.log('#1 b'); */

				if (!setTop && !innerScrollDifference) {
					sidebar.style.position = 'relative';
					sidebar.style.top = `${currentOffsetTop}px`;
					setTop = true;
					setTopScroll = window.scrollY;
				} else if (setTop && innerScrollDifference) {
					/* console.log('#3 b'); */
					setTop = false;
					innerScrollDifference = 0;
					currentFixBot = sidebar.getBoundingClientRect().top;
					sidebar.style.position = 'sticky';
					sidebar.style.top = `${currentFixBot}px`;
					pinnedBottom = true;
				} else {
					lastScrollPosition = window.scrollY;
					innerScrollDifference =
						Math.round(sidebar.offsetHeight - window.innerHeight + 76) <=
						Math.round(window.scrollY - setTopScroll);

					return;
				}
			} else if (window.scrollY > difference) {
				/* console.log('#2 b'); */
				currentFixBot = sidebar.getBoundingClientRect().top;
				sidebar.style.position = 'sticky';
				sidebar.style.top = `${currentFixBot}px`;
				currentFixBotScroll = window.scrollY;
				pinnedBottom = true;
			}

			lastScrollPosition = window.scrollY;
		}
	}

	let demoData = {
		title: 'Ella Bache',
		categories: [
			{
				label: 'Очищение и демакияж',
				href: '#'
			},
			{
				label: 'Тонизирование',
				href: '#'
			},
			{
				label: 'Увлажнение',
				href: '#'
			},
			{
				label: 'Пилинги',
				href: '#'
			},
			{
				label: 'Сыворотки',
				href: '#'
			},
			{
				label: 'Маски',
				href: '#'
			},
			{
				label: 'Масла',
				href: '#'
			},
			{
				label: 'Защита от солнца SPF',
				href: '#'
			},
			{
				label: 'Уход за кожей вокруг глаз',
				href: '#'
			},
			{
				label: 'Уход за сухой кожей',
				href: '#'
			},
			{
				label: 'Уход за жирной и проблемной кожей',
				href: '#'
			},
			{
				label: 'Уход за чувствительной кожей',
				href: '#'
			},
			{
				label: 'Уход 20+',
				href: '#'
			},
			{
				label: 'Уход 27+',
				href: '#'
			},
			{
				label: 'Уход 48+',
				href: '#'
			},
			{
				label: 'Уход 60+',
				href: '#'
			},
			{
				label: 'Увлажняющая линия Hydra Plumping',
				href: '#'
			},
			{
				label: 'Линия мезопил Tomate Glow',
				href: '#'
			}
		]
	};
	const products = [
		{
			title: 'Очищающий мусс с ликопеном Элла Баше, 150 мл',
			description:
				'Очищает кожу лица, шеи и декольте от загрязнений и остатков декоративной косметики, глубоко очищает поры.',
			price: '3 927',
			thumbnail: '/product1.png',
			href: '/catalog/123'
		},
		{
			title: 'Увлажняющая сыворотка-плампер Super Serum Элла Баше, 30 мл',
			description:
				'Высококонцентрированная космецевтическая сыворотка гарантирует увлажнение на 48 часов.',
			price: '7 293',
			thumbnail: '/product2.png',
			href: '/catalog/123'
		},
		{
			title: 'Крем-филлер для век спирулина крио, 15 мл',
			description:
				'Нежный крем с охлаждающим аппликатором создан специально для решения специфических проблем области..',
			price: '6 192',
			thumbnail: '/product3.png',
			href: '/catalog/123'
		},
		{
			title: 'Очищающий мусс с ликопеном Элла Баше, 150 мл',
			description:
				'Очищает кожу лица, шеи и декольте от загрязнений и остатков декоративной косметики, глубоко очищает поры.',
			price: '3 927',
			thumbnail: '/product1.png',
			href: '/catalog/123'
		},
		{
			title: 'Увлажняющая сыворотка-плампер Super Serum Элла Баше, 30 мл',
			description:
				'Высококонцентрированная космецевтическая сыворотка гарантирует увлажнение на 48 часов.',
			price: '7 293',
			thumbnail: '/product2.png',
			href: '/catalog/123'
		},
		{
			title: 'Крем-филлер для век спирулина крио, 15 мл',
			description:
				'Нежный крем с охлаждающим аппликатором создан специально для решения специфических проблем области..',
			price: '6 192',
			thumbnail: '/product3.png',
			href: '/catalog/123'
		},
		{
			title: 'Очищающий мусс с ликопеном Элла Баше, 150 мл',
			description:
				'Очищает кожу лица, шеи и декольте от загрязнений и остатков декоративной косметики, глубоко очищает поры.',
			price: '3 927',
			thumbnail: '/product1.png',
			href: '/catalog/123'
		},
		{
			title: 'Увлажняющая сыворотка-плампер Super Serum Элла Баше, 30 мл',
			description:
				'Высококонцентрированная космецевтическая сыворотка гарантирует увлажнение на 48 часов.',
			price: '7 293',
			thumbnail: '/product2.png',
			href: '/catalog/123'
		},
		{
			title: 'Крем-филлер для век спирулина крио, 15 мл',
			description:
				'Нежный крем с охлаждающим аппликатором создан специально для решения специфических проблем области..',
			price: '6 192',
			thumbnail: '/product3.png',
			href: '/catalog/123'
		},
		{
			title: 'Очищающий мусс с ликопеном Элла Баше, 150 мл',
			description:
				'Очищает кожу лица, шеи и декольте от загрязнений и остатков декоративной косметики, глубоко очищает поры.',
			price: '3 927',
			thumbnail: '/product1.png',
			href: '/catalog/123'
		},
		{
			title: 'Увлажняющая сыворотка-плампер Super Serum Элла Баше, 30 мл',
			description:
				'Высококонцентрированная космецевтическая сыворотка гарантирует увлажнение на 48 часов.',
			price: '7 293',
			thumbnail: '/product2.png',
			href: '/catalog/123'
		},
		{
			title: 'Крем-филлер для век спирулина крио, 15 мл',
			description:
				'Нежный крем с охлаждающим аппликатором создан специально для решения специфических проблем области..',
			price: '6 192',
			thumbnail: '/product3.png',
			href: '/catalog/123'
		},
		{
			title: 'Очищающий мусс с ликопеном Элла Баше, 150 мл',
			description:
				'Очищает кожу лица, шеи и декольте от загрязнений и остатков декоративной косметики, глубоко очищает поры.',
			price: '3 927',
			thumbnail: '/product1.png',
			href: '/catalog/123'
		},
		{
			title: 'Увлажняющая сыворотка-плампер Super Serum Элла Баше, 30 мл',
			description:
				'Высококонцентрированная космецевтическая сыворотка гарантирует увлажнение на 48 часов.',
			price: '7 293',
			thumbnail: '/product2.png',
			href: '/catalog/123'
		},
		{
			title: 'Крем-филлер для век спирулина крио, 15 мл',
			description:
				'Нежный крем с охлаждающим аппликатором создан специально для решения специфических проблем области..',
			price: '6 192',
			thumbnail: '/product3.png',
			href: '/catalog/123'
		},
		{
			title: 'Очищающий мусс с ликопеном Элла Баше, 150 мл',
			description:
				'Очищает кожу лица, шеи и декольте от загрязнений и остатков декоративной косметики, глубоко очищает поры.',
			price: '3 927',
			thumbnail: '/product1.png',
			href: '/catalog/123'
		},
		{
			title: 'Увлажняющая сыворотка-плампер Super Serum Элла Баше, 30 мл',
			description:
				'Высококонцентрированная космецевтическая сыворотка гарантирует увлажнение на 48 часов.',
			price: '7 293',
			thumbnail: '/product2.png',
			href: '/catalog/123'
		},
		{
			title: 'Крем-филлер для век спирулина крио, 15 мл',
			description:
				'Нежный крем с охлаждающим аппликатором создан специально для решения специфических проблем области..',
			price: '6 192',
			thumbnail: '/product3.png',
			href: '/catalog/123'
		},
		{
			title: 'Очищающий мусс с ликопеном Элла Баше, 150 мл',
			description:
				'Очищает кожу лица, шеи и декольте от загрязнений и остатков декоративной косметики, глубоко очищает поры.',
			price: '3 927',
			thumbnail: '/product1.png',
			href: '/catalog/123'
		},
		{
			title: 'Увлажняющая сыворотка-плампер Super Serum Элла Баше, 30 мл',
			description:
				'Высококонцентрированная космецевтическая сыворотка гарантирует увлажнение на 48 часов.',
			price: '7 293',
			thumbnail: '/product2.png',
			href: '/catalog/123'
		},
		{
			title: 'Крем-филлер для век спирулина крио, 15 мл',
			description:
				'Нежный крем с охлаждающим аппликатором создан специально для решения специфических проблем области..',
			price: '6 192',
			thumbnail: '/product3.png',
			href: '/catalog/123'
		},
		{
			title: 'Очищающий мусс с ликопеном Элла Баше, 150 мл',
			description:
				'Очищает кожу лица, шеи и декольте от загрязнений и остатков декоративной косметики, глубоко очищает поры.',
			price: '3 927',
			thumbnail: '/product1.png',
			href: '/catalog/123'
		},
		{
			title: 'Увлажняющая сыворотка-плампер Super Serum Элла Баше, 30 мл',
			description:
				'Высококонцентрированная космецевтическая сыворотка гарантирует увлажнение на 48 часов.',
			price: '7 293',
			thumbnail: '/product2.png',
			href: '/catalog/123'
		},
		{
			title: 'Крем-филлер для век спирулина крио, 15 мл',
			description:
				'Нежный крем с охлаждающим аппликатором создан специально для решения специфических проблем области..',
			price: '6 192',
			thumbnail: '/product3.png',
			href: '/catalog/123'
		},
		{
			title: 'Очищающий мусс с ликопеном Элла Баше, 150 мл',
			description:
				'Очищает кожу лица, шеи и декольте от загрязнений и остатков декоративной косметики, глубоко очищает поры.',
			price: '3 927',
			thumbnail: '/product1.png',
			href: '/catalog/123'
		},
		{
			title: 'Увлажняющая сыворотка-плампер Super Serum Элла Баше, 30 мл',
			description:
				'Высококонцентрированная космецевтическая сыворотка гарантирует увлажнение на 48 часов.',
			price: '7 293',
			thumbnail: '/product2.png',
			href: '/catalog/123'
		},
		{
			title: 'Крем-филлер для век спирулина крио, 15 мл',
			description:
				'Нежный крем с охлаждающим аппликатором создан специально для решения специфических проблем области..',
			price: '6 192',
			thumbnail: '/product3.png',
			href: '/catalog/123'
		},
		{
			title: 'Очищающий мусс с ликопеном Элла Баше, 150 мл',
			description:
				'Очищает кожу лица, шеи и декольте от загрязнений и остатков декоративной косметики, глубоко очищает поры.',
			price: '3 927',
			thumbnail: '/product1.png',
			href: '/catalog/123'
		},
		{
			title: 'Увлажняющая сыворотка-плампер Super Serum Элла Баше, 30 мл',
			description:
				'Высококонцентрированная космецевтическая сыворотка гарантирует увлажнение на 48 часов.',
			price: '7 293',
			thumbnail: '/product2.png',
			href: '/catalog/123'
		},
		{
			title: 'Крем-филлер для век спирулина крио, 15 мл',
			description:
				'Нежный крем с охлаждающим аппликатором создан специально для решения специфических проблем области..',
			price: '6 192',
			thumbnail: '/product3.png',
			href: '/catalog/123'
		},
		{
			title: 'Очищающий мусс с ликопеном Элла Баше, 150 мл',
			description:
				'Очищает кожу лица, шеи и декольте от загрязнений и остатков декоративной косметики, глубоко очищает поры.',
			price: '3 927',
			thumbnail: '/product1.png',
			href: '/catalog/123'
		},
		{
			title: 'Увлажняющая сыворотка-плампер Super Serum Элла Баше, 30 мл',
			description:
				'Высококонцентрированная космецевтическая сыворотка гарантирует увлажнение на 48 часов.',
			price: '7 293',
			thumbnail: '/product2.png',
			href: '/catalog/123'
		},
		{
			title: 'Крем-филлер для век спирулина крио, 15 мл',
			description:
				'Нежный крем с охлаждающим аппликатором создан специально для решения специфических проблем области..',
			price: '6 192',
			thumbnail: '/product3.png',
			href: '/catalog/123'
		},
		{
			title: 'Очищающий мусс с ликопеном Элла Баше, 150 мл',
			description:
				'Очищает кожу лица, шеи и декольте от загрязнений и остатков декоративной косметики, глубоко очищает поры.',
			price: '3 927',
			thumbnail: '/product1.png',
			href: '/catalog/123'
		},
		{
			title: 'Увлажняющая сыворотка-плампер Super Serum Элла Баше, 30 мл',
			description:
				'Высококонцентрированная космецевтическая сыворотка гарантирует увлажнение на 48 часов.',
			price: '7 293',
			thumbnail: '/product2.png',
			href: '/catalog/123'
		},
		{
			title: 'Крем-филлер для век спирулина крио, 15 мл',
			description:
				'Нежный крем с охлаждающим аппликатором создан специально для решения специфических проблем области..',
			price: '6 192',
			thumbnail: '/product3.png',
			href: '/catalog/123'
		}
	];
</script>

<svelte:window onscroll={sidebarStickyPositionCalculation} />

{#snippet sidebarSnippet(content)}
	<div class="sticky bottom-5 -ml-2 flex h-fit flex-col gap-5" bind:this={sidebar}>
		<h1 class="ml-2 py-5 text-2xl">{content.title}</h1>
		<nav>
			<ul class="-mt-3 flex flex-col">
				{#each content.categories as category}
					<li
						class=" group h-full w-full flex-grow rounded transition duration-300 hover:bg-bgColor max-md:hover:bg-white"
					>
						<a class="flex h-full w-full px-2 py-3 max-md:px-0" href={category.href}
							>{category.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
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
			<div class="grid grid-cols-[1fr_4fr] gap-4 max-lg:flex">
				<div class="h-full max-lg:hidden">
					{@render sidebarSnippet(demoData)}
				</div>
				<div class="flex flex-col gap-5">
					<div
						class="top-[76px] flex sticky w-full items-center justify-between bg-white max-lg:relative max-lg:top-auto"
					>
						<div
							class="z-20 flex w-full items-center gap-8 py-5 transition max-lg:gap-16 duration-300 max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:z-20 max-lg:h-[calc(100vh-60px)] max-lg:w-full max-lg:flex-col max-lg:items-start max-lg:bg-white max-lg:px-5"
							bind:this={filters}
							class:translate-y-0={open}
							class:translate-y-[100%]={!open}
						>
							<p class="text-center text-lg flex lg:hidden -mb-5">Фильтры</p>
							<button
								type="button"
								class="fixed right-5 top-5 hidden h-6 w-6 p-1 max-lg:flex"
								onclick={() => {
									open = false;
								}}
							>
								<img class="w-full object-contain" src="/cross.svg" alt="cross icon" />
							</button>
							<PriceFilter />
							<SortFilters />
						</div>
						<h1 class="hidden font-serif text-xl max-lg:flex">{demoData.title}</h1>
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
					<div class="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
						{#each products as product}
							<ProductCard content={product} />
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
