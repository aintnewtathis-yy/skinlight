<script>
	import { CMS_URL } from '$lib/globals.js';
	import { fade } from 'svelte/transition';

	let { sliderContent } = $props();
</script>

{#snippet slide(content)}
	{@const imageSrc = content.image?.formats?.large?.url
		? CMS_URL + content.image.formats.large.url
		: CMS_URL + content.image?.url}
	<div class="grid grid-cols-2 max-md:flex max-md:h-svh max-md:flex-col">
		<div
			class="max-md:w-[calc(100% - 40px)] z-10 flex w-3/4 flex-col justify-center gap-4 pl-5 max-xl:w-full max-md:absolute max-md:bottom-32"
			in:fade={{ duration: 300 }}
			out:fade={{ duration: 0 }}
		>
			<h1
				class="text-balance font-serif text-5xl max-lg:text-4xl max-md:text-5xl max-md:text-bgColorBright"
			>
				{content.title}
			</h1>
			<p
				class="w-3/4 text-xl text-textDull max-lg:text-base max-md:w-full max-md:text-lg max-md:text-bgColorBright"
			>
				{content.description}
			</p>
			<a href="#timetable" class="btn-dull mt-4 py-3 text-lg max-md:hidden">Посмотреть расписание</a
			>
		</div>
		<a
			href="#timetable"
			class="max-md:h-svh"
			in:fade={{ duration: 300 }}
			out:fade={{ duration: 0 }}
		>
			<picture>
				<img
					class="aspect-[800/700] h-full w-full object-cover object-center max-md:brightness-75"
					src={imageSrc}
					width={content.image?.width}
					height={content.image?.height}
					alt={content.image?.alternativeText ?? ''}
				/>
			</picture>
		</a>
	</div>
{/snippet}

<section>
	<div>
		{@render slide(sliderContent)}
	</div>
</section>
