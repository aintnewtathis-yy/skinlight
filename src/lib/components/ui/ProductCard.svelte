<script>
	import { CMS_URL } from '$lib/globals.js';
	import { getToastState, getCartState, getWishlistState } from '$lib/globals.svelte';
	import { page } from '$app/stores';

	let toastState = getToastState();
	let cartState = getCartState();
	let wishlistState = getWishlistState();
	let { content } = $props();

	$inspect(content)
	const srcUrl = content.thumbnail?.formats?.large?.url ?? content.thumbnail?.url;
</script>

<div class="flex h-full w-full flex-col gap-3 transition-none">
	<div class="flex items-center justify-center rounded bg-[#FAFAFA]">
		<a
			class="aspect-[290/320] flex-grow"
			href={'/catalog/' + content.brand?.seo?.slug + '/' + content.seo?.slug}
		>
			<img
				class=" my-5 aspect-[290/320] flex-grow object-contain"
				src={CMS_URL + srcUrl}
				alt={content.thumbnail?.alternativeText}
				width={content.thumbnail?.width}
				height={content.thumbnail?.height}
			/>
		</a>

		<button
			class="absolute bottom-3 right-3 h-8 w-8"
			type="button"
			onclick={() => {
				toastState.add('Товар добавлен в корзину');
				cartState.add(
					content.documentId,
					content.brand,
					content.name,
					1,
					content.priceRUB,
					content.priceRUBOpt,
					content.thumbnail,
					content.shortDesc,
					content.seo,
					content.SKU
				);
			}}
		>
			<img class="w-full object-cover" src="/add-to-cart.svg" alt="add to cart icon" />
		</button>
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button
			type="button"
			class="absolute right-3 top-4 flex h-5 w-5 justify-center"
			class:added={wishlistState.products.some(
				(product) => product.documentId === content.documentId
			)}
			onclick={(e) => {
				if (e.currentTarget.classList.contains('added')) {
					wishlistState.remove(content.documentId);
					e.currentTarget.classList.remove('added');
				} else {
					toastState.add('Товар добавлен в вишлист');
					wishlistState.add(
						content.documentId,
						content.brand,
						content.name,
						1,
						content.priceRUB,
						content.priceRUBOpt,
						content.thumbnail,
						content.shortDesc,
						content.seo,
						content.SKU
					);

					e.currentTarget.classList.add('added');
				}
			}}
		>
			<svg
				class="h-full w-full transition duration-300"
				viewBox="0 0 12 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M11.5 0.5H0.5V19.5C2.59224 14.4786 9.40773 14.4786 11.5 19.5V0.5Z"
					stroke="#A29C99"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>

	<a href={'/catalog/' + content.brand?.seo?.slug + '/' + content.seo?.slug}>
		<h4 class="-mb-1 text-lg max-2xl:text-base max-md:text-sm">{content.name}</h4>
	</a>
	<p class="mt-auto line-clamp-3 text-sm text-textDull max-xl:line-clamp-2 max-md:text-xs">
		{content.shortDesc}
	</p>
	{#if $page.data?.user?.masterStatus === 'Проверен'}
		<p class=" flex items-baseline gap-2 text-lg max-2xl:text-base max-md:text-sm">
			<span>{content.priceRUBOpt} руб</span>
			<span class="text-[#A29C99] line-through opacity-50">{content.priceRUB} руб</span>
		</p>
	{:else}
		<p class=" text-lg max-2xl:text-base max-md:text-sm">{content.priceRUB} руб</p>
	{/if}
</div>

<style>
	.added svg {
		fill: #4a3931;
	}
	.added svg path {
		stroke: #4a3931;
	}
</style>
