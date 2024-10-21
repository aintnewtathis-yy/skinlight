<script>
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
	import ProductCard from '$lib/components/ui/ProductCard.svelte';

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
		}
	];
</script>

<section class="pt-6">
	<div class="container">
		<div class="flex flex-col gap-10">
			<div class="max-lg:hidden">
				<Breadcrumbs />
			</div>
			<h1 class="text-balance font-serif text-5xl max-lg:text-4xl max-md:text-3xl ">Вишлист</h1>
			<div class="grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
				{#each products as product}
					<ProductCard content={product} />
				{/each}
			</div>
		</div>
	</div>
</section>
