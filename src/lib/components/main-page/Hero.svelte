<script>
	import { CMS_URL } from '$lib/globals.js';
	import { fade } from 'svelte/transition';

	let { sliderContent } = $props();
	let pagination;
	let interval;
	let paginationElmts;

	function sliderOnClick(e, idInput) {
		clearInterval(interval);
		const id = e ? Number(e.currentTarget.dataset.visible) : idInput;
		activeSlide = sliderContent[id];

		if (id > 0) {
			for (let j = 0; j < sliderContent.length; j++) {
				if (j < id) {
					paginationElmts[j].style.width = `100%`;
				} else {
					paginationElmts[j].style.width = `0%`;
				}
			}
			paginationElmts[id].style.width = `0%`;
			startTimer(paginationElmts, id);
		} else {
			paginationElmts.forEach((el) => {
				el.style.width = `0%`;
			});
			paginationElmts[id].style.width = `0%`;
			startTimer(paginationElmts, id);
		}
	}
	function startTimer(paginationElmts, id) {
		clearInterval(interval);
		let progress = 0;
		const intervalTime = 10;
		const increment = 100 / (5000 / intervalTime);

		interval = setInterval(() => {
			progress += increment;
			if (progress >= 100) {
				clearInterval(interval);
				if (id < sliderContent.length - 1) {
					sliderOnClick(null, ++id);
				} else {
					paginationElmts.forEach((el) => {
						el.style.width = `0%`;
					});
					paginationElmts[id].style.width = `0%`;
					sliderOnClick(null, 0);
				}
			} else {
				paginationElmts[id].style.width = `${progress}%`;
			}
		}, intervalTime);

		return interval;
	}
	let activeSlide = $state(sliderContent[0]);

	$effect(() => {
		paginationElmts = pagination.querySelectorAll(`[data-visible] div`);

		sliderOnClick(null, 0);

		return () => {
			clearInterval(interval);
			paginationElmts = null
		};
	});
</script>

{#snippet slides(content)}
	{@const imageSrc = content.image?.formats?.large?.url ?? content.image?.url}
	{@const imageMobileSrc = content.imageMobile?.formats?.large?.url ?? content.imageMobile?.url}
	<div class="grid grid-cols-2 max-md:flex max-md:h-svh max-md:flex-col">
		<div
			class="z-10 flex w-3/4 flex-col justify-center gap-4 pl-5 max-xl:w-full max-md:absolute max-md:bottom-32 max-md:w-[calc(100%_-_40px)]"
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
			<a href={content.btnHref} class="btn mt-4 py-3 text-lg max-md:hidden">{content.btnText}</a>
		</div>
		<a
			href={content.btnHref}
			class="max-md:h-svh"
			in:fade={{ duration: 300 }}
			out:fade={{ duration: 0 }}
		>
			<picture>
				<source media="(max-width: 767px)" srcset={CMS_URL + imageMobileSrc} type="image/png" />
				<source media="(min-width: 768px)" srcset={CMS_URL + imageSrc} type="image/png" />
				<img
					class="aspect-[800/700] h-full w-full object-cover object-center"
					src={CMS_URL + imageMobileSrc}
					alt={content.image?.alternativeText}
				/>
			</picture>
		</a>
	</div>
{/snippet}

<section>
	<div>
		{#key activeSlide}
			{@render slides(activeSlide)}
		{/key}
		<div
			class="absolute bottom-24 left-5 z-10 flex h-1 items-end gap-1 max-xl:bottom-4 max-md:bottom-20 max-md:left-5 max-md:w-[calc(100%_-_40px)] max-md:justify-start"
			bind:this={pagination}
		>
			{#each sliderContent as _, i}
				<button
					aria-label="button"
					class="z-10 h-full max-h-[2px] w-10 cursor-pointer bg-dull duration-0 max-md:bg-textDull"
					data-visible={i}
					onclick={sliderOnClick}
				>
					<div
						class="pointer-events-none h-full w-0 bg-textDull transition-none max-md:bg-bgColorBright"
					></div>
				</button>
			{/each}
		</div>
	</div>
</section>
