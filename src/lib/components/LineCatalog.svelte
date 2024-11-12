<script>
	import { CMS_URL } from '$lib/globals.js';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import ProductCard from '$lib/components/ui/ProductCard.svelte';

	let { title, image, products, slug, brandSlug } = $props();
</script>

<section>
	<div class="flex flex-col gap-6 px-5 max-md:px-0">
		<div class="flex items-end justify-between max-md:px-5">
			<h3 class="font-serif text-3xl">{title}</h3>
			<a href={'/catalog/' + brandSlug + '?lineSlug=' + slug} class="flex items-center gap-3 max-md:hidden">
				<span class="whitespace-nowrap transition duration-300 hover:text-accentTextHover"
					>Посмотреть все</span
				>
				<img src="/arrow-catalog.svg" alt="arrow" />
			</a>
		</div>
		<div class="flex gap-4 max-lg:flex-col max-md:flex">
			<a
				href={'/catalog/' + brandSlug + '?lineSlug=' + slug}
				class=" w-[calc((100%_-_16px)_/_5_*_2)] max-lg:w-full max-md:px-5"
			>
				<img
					class="h-full w-full rounded object-cover max-lg:aspect-video max-lg:object-[0_-50px] max-md:object-center"
					src={image?.formats?.large?.url
						? CMS_URL + image?.formats?.large?.url
						: CMS_URL + image?.url}
					width={image?.width}
					height={image?.height}
					alt={image?.alretnativeText}
				/>
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
					{#each products as product}
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
