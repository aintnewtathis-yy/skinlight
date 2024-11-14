<script>
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
	import ProductCard from '$lib/components/ui/ProductCard.svelte';
	import { getWishlistState } from '$lib/globals.svelte';
	import Seo from '$lib/components/utils/SEO.svelte';

	let wishlistState = getWishlistState();

	let open = $state(false);
</script>

<Seo
	title={"Вишлист"}
	description={"Вишлист"}
/>

<section class="pt-6 ">
	<div class="container">
		<div class="flex flex-col gap-10">
			<div class="max-lg:hidden">
				<Breadcrumbs />
			</div>
			<h1 class="text-balance font-serif text-5xl max-lg:text-4xl max-md:text-3xl">Вишлист</h1>
			{#if wishlistState.products.length > 0}
				<div class="grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
					{#each wishlistState.products as product}
						<ProductCard content={product} />
					{/each}
				</div>
			{:else}
				<div class="mx-auto flex max-w-[300px] h-full flex-col items-center justify-center gap-4 max-md:h-[60vh]">
					<svg
						width="24"
						height="40"
						viewBox="0 0 12 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.5 0.5H0.5V19.5C2.59224 14.4786 9.40773 14.4786 11.5 19.5V0.5Z"
							stroke="#897E79"
							stroke-linejoin="round"
						/>
					</svg>

					<h2 class="font-serif text-2xl">Вишлист пока пуст</h2>
					<p class="text-balance text-center text-sm text-textDull">
						Здесь будут модели, которые вы отложите в избранное
					</p>
					<a href="/catalog" class="btn-bordered mt-3">Перейти в каталог</a>
				</div>
			{/if}
		</div>
	</div>
</section>
