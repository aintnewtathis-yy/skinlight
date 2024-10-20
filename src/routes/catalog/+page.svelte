<script>
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
	import ProductCard from '$lib/components/ui/ProductCard.svelte';
	import PriceFilter from '../../lib/components/ui/PriceFilter.svelte';
	import SortFilters from '../../lib/components/ui/SortFilters.svelte';
	import { gsap } from 'gsap/dist/gsap';

	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let sidebar;
	let filters;
	let open = $state(false);

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
		}
	];
</script>

{#snippet sidebarSnippet(content)}
	<div class="-ml-2 flex h-fit flex-col gap-7" bind:this={sidebar}>
		<h1 class="ml-2 py-3 text-2xl">{content.title}</h1>
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

<section class="pt-6">
	<div class="container">
		<div class="flex flex-col gap-12">
			<div class="max-lg:hidden">
				<Breadcrumbs />
			</div>
			<div class="grid grid-cols-[1fr_4fr] gap-4 max-lg:flex">
				<div class="max-lg:hidden">
					{@render sidebarSnippet(demoData)}
				</div>
				<div class="flex flex-col gap-7">
					<div class="flex w-full items-center justify-between">
						<div
							class="flex w-full items-center gap-8 py-3 max-lg:fixed max-lg:top-full max-lg:z-20 max-lg:bg-white max-lg:flex-col max-lg:items-start"
							bind:this={filters}
							class:-translate-y-60={open}
						>
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
