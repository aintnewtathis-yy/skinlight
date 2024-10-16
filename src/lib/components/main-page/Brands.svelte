<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	const brands = [
		{
			image: '/EllaBache.png',
			label: 'Ella Bache',
			href: '#'
		},
		{
			image: '/Pandhys.png',
			label: `Pandhy's`,
			href: '#'
		},
		{
			image: '/Babor.png',
			label: 'Babor',
			href: '#'
		},
		{
			image: '/christina.png',
			label: 'Christina',
			href: '#'
		}
	];
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
			{#each brands as brand}
				<SplideSlide>
					<a href={brand.href} class="flex flex-col gap-3">
						<img class="aspect-[368/320] rounded object-cover border border-borderColor" src={brand.image} alt="" />
						<p class="font-serif text-2xl">{brand.label}</p>
					</a>
				</SplideSlide>
			{/each}
		</Splide>
	</div>
</section>
