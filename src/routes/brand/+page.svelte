<script>
	import HeroBrand from '$lib/components/brand/HeroBrand.svelte';
	import LineCatalog from '$lib/components/LineCatalog.svelte';
	import CatalogRow from '../../lib/components/global/CatalogRow.svelte';

	let aboutData = {
		preTitle: '/brandBlockPreTitle.svg',
		mainText:
			'BABOR – ведущий мировой бренд профессиональной косметики. Это семейный бизнес, во главе которого стоит третье поколение семьи владельцев.',
		additionalText: `
            <p>BABOR разрабатывает работающие решения для удовлетворения индивидуальных потребностей кожи любого типа. Это эффективность, подтверждённая экспертами-дерматологами во всём мире.</p>
            <p>Чтобы соответствовать уровню требований своих клиентов, BABOR делает ставку на более чем 65-летнюю экспертизу в области ухода за кожей made in Germany: разработка и производство осуществляется исключительно в штаб-квартире бренда в Ахене. Поэтому каждый продукт – от идеи до готовой баночки – это знак качества, науки, точности и результата.</p>
        `,
		aboutImage: '/brandBlockImage.png'
	};

	const babor = {
		title: 'Новинки',
		href: '#'
	};
</script>

<HeroBrand />
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
				class="mt-3 flex w-2/4 flex-col gap-12 max-lg:w-2/3 max-lg:gap-8 max-md:flex max-md:w-full max-md:flex-col max-md:gap-6"
			>
				<img
					src={aboutData.aboutImage}
					class="h-full rounded max-md:aspect-[4/3]"
					alt="cosmetics"
				/>
				<div class="flex flex-col gap-6">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="flex flex-col gap-6 overflow-hidden max-md:gap-2">
						<p class="font-serif text-2xl max-lg:text-xl">
							С 1956 года BABOR определяет вектор развития медицинской косметологии с акцентом на
							экологичность и профессионализм.
						</p>
						<div class="flex flex-col gap-2 *:max-xl:text-sm max-lg:text-sm">
							{@html aboutData.additionalText}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<LineCatalog />
<CatalogRow content={babor} />
