<script>
	let { content } = $props();
</script>

<a href={content.href} class="flex h-full w-full flex-col gap-3 transition-none">
	<div class="flex items-center justify-center rounded bg-bgColor">
		<img
			class=" my-5 aspect-[290/320] flex-grow object-contain"
			src={content.thumbnail}
			alt={content.alternativeText}
		/>
		<button type="button" onclick={() => {}} class="absolute bottom-3 right-3 h-8 w-8">
			<img class="w-full object-cover" src="/add-to-cart.svg" alt="add to cart icon" />
		</button>
	</div>
	<h4 class="text-lg -mb-1 max-2xl:text-base max-md:text-sm">{content.title}</h4>
	<p class="mt-auto text-sm text-textDull max-xl:line-clamp-2 max-md:text-xs">
		{content.description}
	</p>
	<p class=" text-lg max-2xl:text-base max-md:text-sm">{content.price} руб</p>
</a>
