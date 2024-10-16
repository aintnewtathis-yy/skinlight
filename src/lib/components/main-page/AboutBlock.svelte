<script>
	let paragraph;
	let aboutData = {
		preTitle: '/aboutBlockPreTitle.svg',
		mainText:
			'Более 15 лет нашей продукцией пользуются профессиональные косметологи и их клиенты, что обусловлено высокой эффективностью косметических средств и подтверждено европейскими центрами сертифицирования.',
		additionalText: `
            <p>Группа компаний «Скин Лайт» - с 2002 года представляет на российском рынке профессиональную косметику ведущих европейских брендов.</p>
            <p>Компания «Скин Лайт» - это надежный партнерв области бьюти-индустрии. Широкая сеть дистрибуции охватывает всю территорию России и количество наших партнеров профессиональной косметики постоянно расширяется.</p>
        `,
		aboutImage: '/aboutBlockImage.png',
		btnText: 'Узнать больше',
		btnHref: '#'
	};
</script>

<section id="about">
	<div class="container">
		<div class="flex flex-col items-center gap-8 max-md:gap-6">
			<img class="max-w-40 max-md:max-w-32" src={aboutData.preTitle} alt="skinlight group" />
			<h6
				class="w-4/5 text-balance text-center font-serif text-5xl max-lg:w-full max-lg:text-4xl max-md:text-2xl"
			>
				{aboutData.mainText}
			</h6>
			<div
				class="grid w-2/4 grid-cols-2 gap-4 mt-3 max-lg:w-2/3 max-md:flex max-md:w-full max-md:flex-col max-md:gap-6"
			>
				<img src={aboutData.aboutImage} class="h-full rounded max-md:aspect-[4/3]" alt="cosmetics" />
				<div class="flex flex-col gap-6">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="flex flex-col gap-2 overflow-hidden  *:text-textDull *:max-xl:text-sm max-lg:text-sm max-md:max-h-20 max-md:gap-2"
						bind:this={paragraph}
						onclick={() => {
							paragraph.classList.toggle('max-md:max-h-20');
							paragraph.querySelector('.gradient').classList.toggle('max-md:flex');
						}}
					>
						{@html aboutData.additionalText}
						<span class="gradient absolute bottom-0 left-0 hidden h-6 w-full max-md:flex"></span>
					</div>
					<a href={aboutData.btnHref} class="btn-dull">
						{aboutData.btnText}
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