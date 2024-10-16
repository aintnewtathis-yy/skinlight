<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import ProductCard from '$lib/components/ui/ProductCard.svelte';

	let lineContent = {
		title: 'HYDRA REPULP от Ella Bache',
		href: '/catalog',
		image: '/line.png',
		products: [
			{
				title: 'Очищающий мусс с ликопеном Элла Баше, 150 мл',
				description:
					'Очищает кожу лица, шеи и декольте от загрязнений и остатков декоративной косметики, глубоко очищает поры.',
				price: '3 927',
				thumbnail: '/product1.png',
				href: '/catalog/test'
			},
			{
				title: 'Увлажняющая сыворотка-плампер Super Serum Элла Баше, 30 мл',
				description:
					'Высококонцентрированная космецевтическая сыворотка гарантирует увлажнение на 48 часов.',
				price: '7 293',
				thumbnail: '/product2.png',
				href: '/catalog/test'
			},
			{
				title: 'Крем-филлер для век спирулина крио, 15 мл',
				description:
					'Нежный крем с охлаждающим аппликатором создан специально для решения специфических проблем области..',
				price: '6 192',
				thumbnail: '/product3.png',
				href: '/catalog/test'
			},
			{
				title: 'Очищающий мусс с ликопеном Элла Баше, 150 мл',
				description:
					'Очищает кожу лица, шеи и декольте от загрязнений и остатков декоративной косметики, глубоко очищает поры.',
				price: '3 927',
				thumbnail: '/product1.png',
				href: '/catalog/test'
			},
			{
				title: 'Увлажняющая сыворотка-плампер Super Serum Элла Баше, 30 мл',
				description:
					'Высококонцентрированная космецевтическая сыворотка гарантирует увлажнение на 48 часов.',
				price: '7 293',
				thumbnail: '/product2.png',
				href: '/catalog/test'
			},
			{
				title: 'Крем-филлер для век спирулина крио, 15 мл',
				description:
					'Нежный крем с охлаждающим аппликатором создан специально для решения специфических проблем области..',
				price: '6 192',
				thumbnail: '/product3.png',
				href: '/catalog/test'
			}
		]
	};
</script>

<section>
	<div class="flex flex-col gap-6 px-5 max-md:px-0">
		<div class="flex items-end justify-between max-md:px-5">
			<h3 class="font-serif text-3xl">{lineContent.title}</h3>
			<a href={lineContent.href} class="flex items-center gap-3 max-md:hidden">
				<span class="whitespace-nowrap transition duration-300 hover:text-accentTextHover"
					>Посмотреть все</span
				>
				<img src="/arrow-catalog.svg" alt="arrow" />
			</a>
		</div>
		<div class="flex gap-4 max-lg:flex-col max-md:flex">
			<a href={lineContent.href} class=" w-[calc((100%_-_16px)_/_5_*_2)] max-lg:w-full max-md:px-5">
				<img class="h-full w-full rounded object-cover max-lg:aspect-video max-lg:object-[0_-50px] max-md:object-center" src={lineContent.image} alt="product" />
			</a>
			<div
				class="w-[calc((100%_-_16px)_/_5_*_3)] max-lg:-mt-16 max-lg:w-full max-lg:overflow-hidden"
			>
				<Splide
					aria-label="products"
					options={{
						type: 'slide',
						perPage: 3,
						perMove: 1,
						drag: 'free',
						snap: true,
						gap: '1rem',
						arrows: false,
						pagination: false,
						breakpoints: {
							1024: {
								perPage: 3
							},
							767: {
								perPage: 2,
								gap: '0.5rem',
								padding: { left: 20, right: 20 }
							}
						}
					}}
				>
					{#each lineContent.products as product}
						<SplideSlide>
							<ProductCard content={product} />
						</SplideSlide>
					{/each}
				</Splide>
			</div>
		</div>
	</div>
</section>

<style>
	:global(.splide__slide, .splide__list, .splide__track) {
		transition: none !important;
	}
</style>
