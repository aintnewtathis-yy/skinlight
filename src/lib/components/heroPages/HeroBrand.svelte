<script>
	import { fade } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';

	let pagination;
	let interval;
	let paginationElmts;
	let sliderContent = [
		{
			h1: 'BABOR est. 1956',
			p: 'Экспертный уход от бренда, основанного в Германии.',
			btnText: 'Продукция бренда',
			btnLink: '/catalog',
			bgImage: '/brandHero.png',
			bgImageMobile: '/brandHero.png'
		}
	];

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
		paginationElmts = pagination?.querySelectorAll(`[data-visible] div`);

		if (sliderContent.length >= 2) {
			sliderOnClick(null, 0);
		}

		window.addEventListener('resize', () => {
			if (sliderContent.length >= 2) {
				sliderOnClick(null, 0);
			}
		});
	});
</script>

{#snippet slides(content)}
	<div class="grid grid-cols-2 max-md:flex max-md:flex-col max-md:gap-8 max-md:px-5 max-md:pt-5">
		<div
			class="max-md:w-[calc(100% - 40px)] z-10 flex w-3/4 flex-col justify-center gap-4 pl-5 max-xl:w-full max-md:pl-0"
		>
			<h1
				class="text-balance font-serif text-5xl max-lg:text-4xl max-md:text-center max-md:text-3xl"
			>
				{@html content.h1}
			</h1>
			<p
				class="w-3/4 text-xl text-textDull max-lg:text-base max-md:w-full max-md:text-center max-md:text-base"
			>
				{content.p}
			</p>
			<div
				class="max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:z-20 max-lg:w-full max-lg:bg-white max-lg:px-5 max-lg:py-3 max-lg:shadow-[0_-2px_8px_0_rgb(0,0,0,0.1)] max-md:bottom-[60px]"
			>
				<a
					href={content.btnLink}
					class="md:btn-dull max-md:btn mt-4 py-3 text-lg max-lg:mt-0 max-lg:w-full"
				>
					{content.btnText}
				</a>
			</div>
		</div>
		<a href={content.btnLink} class="max-md:h-fit">
			<picture>
				<source media="(max-width: 767px)" srcset={content.bgImageMobile} type="image/png" />
				<source media="(min-width: 768px)" srcset={content.bgImage} type="image/png" />
				<img
					class="aspect-[800/700] h-full w-full object-cover object-center max-md:rounded max-md:brightness-75"
					src={content.bgImageMobile}
					alt="product"
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
		{#if sliderContent.length >= 2}
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
		{/if}
	</div>
</section>
