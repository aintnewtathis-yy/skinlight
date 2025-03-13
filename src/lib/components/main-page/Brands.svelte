<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import { CMS_URL } from '$lib/globals.js';

	let { brands } = $props()
	
	
</script>

<section>
	<div class="px-5 max-md:p-0">
		<Splide
			aria-label="products"
			options={{
				type: 'slide',
				perPage: 4,
				perMove: 1,
				snap: true,
				drag: 'free',
				gap: '1rem',
				arrows: false,
				width: 'full',
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
			{#each brands as brand}
				{@const imageSrc = brand.image?.formats?.large?.url ? CMS_URL + brand.image?.formats?.large?.url : CMS_URL + brand.image?.url}
				<SplideSlide>
					<a href={brand.href} class="flex flex-col gap-3">
						<img
							class="aspect-[368/320] w-full rounded border border-borderColor object-cover"
							src={imageSrc}
							width={brand.image?.width}
							height={brand.image?.height}
							alt={brand.image?.alternativeText}
						/>
						<p class="font-serif text-2xl">{brand.name}</p>
					</a>
				</SplideSlide>
			{/each}
		</Splide>
	</div>
</section>
