<script>
	import { fade } from 'svelte/transition';

	let sliderContent = [
		{
			h1: 'Обучение шугарингу и курсы косметологии',
			p: 'C профессиональными линиями косметики Pandhy`s и Ella Bache.',
			btnText: 'Узнать подробнее',
			btnLink: '#timetable',
			bgImage: '/timetableHero.png',
			bgImageMobile: '/timetableHero.png'
		}
	];
</script>

{#snippet slide(content)}
	<div class="grid grid-cols-2 max-md:flex max-md:h-svh max-md:flex-col">
		<div
			class="max-md:w-[calc(100% - 40px)] z-10 flex w-3/4 flex-col justify-center gap-4 pl-5 max-xl:w-full max-md:absolute max-md:bottom-32"
			in:fade={{ duration: 300 }}
			out:fade={{ duration: 0 }}
		>
			<h1
				class="text-balance font-serif text-5xl max-lg:text-4xl max-md:text-5xl max-md:text-bgColorBright"
			>
				{content.h1}
			</h1>
			<p
				class="w-3/4 text-xl text-textDull max-lg:text-base max-md:text-lg max-md:w-full max-md:text-bgColorBright"
			>
				{content.p}
			</p>
			<a href={content.btnLink} class="btn-dull mt-4 py-3 text-lg max-md:hidden"
				>{content.btnText}</a
			>
		</div>
		<a
			href={content.btnLink}
			class="max-md:h-svh"
			in:fade={{ duration: 300 }}
			out:fade={{ duration: 0 }}
		>
			<picture>
				<source media="(max-width: 767px)" srcset={content.bgImageMobile} type="image/png" />
				<source media="(min-width: 768px)" srcset={content.bgImage} type="image/png" />
				<img
					class="aspect-[800/700] h-full w-full object-cover object-center max-md:brightness-75"
					src={content.bgImageMobile}
					alt="product"
				/>
			</picture>
		</a>
	</div>
{/snippet}

<section>
	<div>
		{@render slide(sliderContent[0])}
	</div>
</section>
