<script>
	import { CMS_URL } from '$lib/globals.js';
	import FormSheet from '../ui/FormSheet.svelte';
	let { sliderContent, formState, data } = $props();
</script>

{#snippet slide(content)}
	<div class="grid grid-cols-2 max-md:flex max-md:flex-col max-md:gap-8 max-md:px-5 max-md:pt-5">
		<div
			class="max-md:w-[calc(100% - 40px)] flex w-3/4 flex-col justify-center gap-4 pl-5 max-xl:w-full max-md:pl-0"
		>
			<h1
				class="text-balance font-serif text-5xl max-lg:text-4xl max-md:text-center max-md:text-3xl"
			>
				{@html content.title}
			</h1>
			<p
				class="w-3/4 text-xl text-textDull max-lg:text-base max-md:w-full max-md:text-center max-md:text-base"
			>
				{content.description}
			</p>
			<div
				class="max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:z-20 max-lg:w-full max-lg:bg-white max-lg:px-5 max-lg:py-3 max-lg:shadow-[0_-2px_8px_0_rgb(0,0,0,0.1)] max-md:bottom-[60px]"
			>
				<FormSheet btnText={'Оставить заявку'} action={'?/courseSignUp'} course={content.title} {data} {formState} />
			</div>
		</div>
		<a href="asd" class="max-md:h-fit">
			<picture>
				<img
					class="aspect-[800/700] h-full w-full object-cover object-center max-md:rounded max-md:brightness-75"
					src={content.image?.formats?.large?.url
						? CMS_URL + content.image?.formats?.large?.url
						: CMS_URL + content.image?.url}
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
