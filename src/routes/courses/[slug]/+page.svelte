<script>
	import HeroSoloCourse from '$lib/components/heroPages/HeroSoloCourse.svelte';
	import { CMS_URL } from '$lib/globals.js';
	import { marked } from 'marked';
	import Seo from '$lib/components/utils/SEO.svelte';

	let { data, form } = $props();

	let formState = $derived(form) 
</script>

<Seo
	title={data?.seo?.title}
	description={data?.seo?.description}
	image={data?.seo?.image}
/>

<HeroSoloCourse sliderContent={data?.heroCourses} {formState} {data} />
<section class="max-md:-mt-8">
	<div class="container">
		<div
			class="rich-text-block mx-auto flex w-3/5 flex-col gap-12 *:text-lg max-xl:w-4/5 max-lg:w-full max-md:gap-8 max-md:*:text-base"
		>
			{#each data?.blockCourses as block}
				<div class="flex flex-col gap-4">
					<h2 class="heading">{block.title}</h2>
					<p>
						{@html marked.parse(block.content)}
					</p>
					{#if block.image}
						<img
							class="rounded mt-12 max-lg:mt-8 max-md:mt-6 "
							src={block.image?.formats?.large?.url
								? CMS_URL + block.image?.formats?.large?.url
								: CMS_URL + block.image?.url}
							width={block.image?.width}
							height={block.image?.height}
							alt={block.image?.alternativeText ?? ''}
						/>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
