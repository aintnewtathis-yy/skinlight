<script>
	import { CMS_URL } from '$lib/globals.js';
	import { marked } from 'marked';
	let paragraph;

	let { content } = $props();
	
</script>

<section id="about">
	<div class="container">
		<div class="flex flex-col items-center gap-8 max-md:gap-6">
			<p class="text-center">
				<span class="italic">(</span>
				{content.miniTitle}
				<span class="italic">)</span>
			</p>
			<h6
				class="w-4/5 text-balance text-center font-serif text-5xl max-lg:w-full max-lg:text-4xl max-md:text-2xl"
			>
				{content.title}
			</h6>
			<div
				class="mt-3 grid w-2/4 grid-cols-2 gap-4 max-lg:w-2/3 max-md:flex max-md:w-full max-md:flex-col max-md:gap-6"
			>
				<img
					src={content.image?.formats?.large?.url ? CMS_URL + content.image?.formats?.large?.url : CMS_URL + content.image?.url}
					width={content.image?.width}
					height={content.image?.height}
					alt={content.image?.alternativeText}
					class="h-full rounded max-md:aspect-[4/3]"
				/>
				<div class="flex flex-col gap-6">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="flex flex-col gap-2 overflow-hidden *:text-textDull *:max-xl:text-sm max-lg:text-sm max-md:max-h-20 max-md:gap-2"
						bind:this={paragraph}
						onclick={() => {
							paragraph.classList.toggle('max-md:max-h-20');
							paragraph.querySelector('.gradient').classList.toggle('max-md:flex');
						}}
					>
						{@html marked.parse(content.description)}
						<span class="gradient absolute bottom-0 left-0 hidden h-6 w-full max-md:flex"></span>
					</div>
					<a href='/about' class="btn-dull">
						Узнать больше
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.gradient {
		background: rgb(0, 0, 0);
		background: -moz-linear-gradient(180deg, transparent 49%, rgba(255, 255, 255, 1) 100%);
		background: -webkit-linear-gradient(180deg, transparent 49%, rgba(255, 255, 255, 1) 100%);
		background: linear-gradient(180deg, transparent 49%, rgba(255, 255, 255, 1) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#ffffff",GradientType=1);
	}
</style>
