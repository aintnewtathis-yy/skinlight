<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import ProductCard from '$lib/components/ui/ProductCard.svelte';

	let { content, products } = $props();

	$inspect(products)
</script>

<section>
	<div class="flex flex-col gap-6 px-5 max-md:px-0">
		<div class="flex items-end justify-between max-md:px-5">
			<h3 class="font-serif text-3xl">{content.title}</h3>
			{#if content.href}
				<a href={content.href} class="flex items-center gap-3 max-md:hidden">
					<span class="transition duration-300 hover:text-accentTextHover">Посмотреть все</span>
					<img src="/arrow-catalog.svg" alt="arrow" />
				</a>
			{/if}
		</div>
		<div class="max-lg:overflow-hidden">
			<Splide
				aria-label="products"
				options={{
					type: 'slide',
					perPage: 5,
					perMove: 1,
					snap: true,
					drag: 'free',
					gap: '1rem',
					arrows: false,
					width: 'max-content',
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
				{#each products as product}
					<SplideSlide>
						<ProductCard content={product} />
					</SplideSlide>
				{/each}
			</Splide>
		</div>
	</div>
</section>
