<script>
	let sliderContent = [
		{
			h1: `Биоэнергетический массаж для лица гуа-ша`,
			p: 'Техника массажа, основанная на методах древней китайской медицины.',
			btnText: 'Оставить заявку',
			btnLink: '#timetable',
			bgImage: '/timetableHero.png',
			bgImageMobile: '/timetableHero.png'
		}
	];
</script>

{#snippet slide(content)}
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
				class="max-lg:w-full max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:z-20 max-lg:bg-white max-lg:px-5 max-lg:py-3 max-lg:shadow-[0_-2px_8px_0_rgb(0,0,0,0.1)] max-md:bottom-[60px]"
			>
				<a href={content.btnLink} class="md:btn-dull max-md:btn mt-4 py-3 text-lg max-lg:mt-0 max-lg:w-full ">
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
		{@render slide(sliderContent[0])}
	</div>
</section>
