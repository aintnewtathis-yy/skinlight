<script>
	import Seo from '$lib/components/utils/SEO.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/lite-yt-embed.css" />
	<script src="/lite-yt-embed.js"></script>
</svelte:head>

<Seo
	title={'Информация о компании Скин Лайт'}
	description={'Группа компаний «Скин Лайт» - с 2000 года представляет на российском рынке профессиональную косметику ведущих европейских брендов. Компания «Скин Лайт» - это надежный партнер в области бьюти-индустрии.'}
/>

<section class="mb-20 pt-10 max-md:pt-6">
	<div class="container">
		<div class="mx-auto flex w-3/5 flex-col gap-16 max-xl:w-3/4 max-lg:w-full max-lg:gap-10">
			<h1 class="text-center font-serif text-5xl max-xl:text-4xl max-md:text-3xl">
				История компании SKIN LIGHT
			</h1>
			<lite-youtube
				class=" h-full w-full max-w-full rounded"
				style="background-image: url(&quot;https://i.ytimg.com/vi_webp/PEk8_3nV54E/maxresdefault.webp&quot;);"
				videoid="PEk8_3nV54E"
				playlabel="История компании Skinlight"
			></lite-youtube>
			<p class="font-serif text-2xl max-lg:text-xl">
				История "Скин Лайт" началась в 2002 г., когда несколько врачей-косметологов создали
				компанию, чтобы представлять французский косметический бренд на российском рынке. Появился
				первый офис, были организованы тренинги для косметологов и компания смогла заявить о себе,
				как импортер и поставщик косметической продукции.
			</p>
			<div class="flex flex-col gap-3">
				<p class="mb-1 font-serif text-2xl max-lg:text-xl">с 2000 по 2009 год</p>
				<p class="font-sans text-lg max-md:text-base">
					Начинается этап знакомства с сахарной депиляцией, с брендом Pandhy’s на выставке
					Cosmeeting в Париже и начало сотрудничества с венгерской компанией CosMed. Начинается
					экспансия шугаринга в России. В учебном центре изменяется система преподавания,
					вводятся пятидневные тренинги по шугарингу. Российские косметологи проходят обучение в
					Будапеште и Париже. Компания участвует в выставках Интершарм, активно развивает
					направление региональной дистрибуции, а также в международной конференции специалистов
					Пандис в Турции.
				</p>
			</div>
			<div class="flex flex-col gap-3">
				<p class="mb-1 font-serif text-2xl max-lg:text-xl">
					2010 год. Мы открываем новый учебный центр.
				</p>
				<p class="font-sans text-lg max-md:text-base">
					Происходит изменение формата обучения специалистов. Вводится обучение в сфере косметологии
					для новичков. Компания "Скин Лайт" активно развивает региональное направление, помимо
					дистрибуции косметики, проводятся обучающие тренинги. Шугаринг становится частью
					самостоятельного направления в сфере косметологии и обслуживания клиентов.
				</p>
				<p class="font-sans text-lg max-md:text-base">
					"Скин Лайт" увеличивает штата сотрудников компании, расширяет количество образовательных
					тренингов, меняется формат позиционирования и имиджа представляемых в России брендов.
					Вводится новая система персональной идентификации уровня специалистов - Паспорт Пандис.
				</p>
			</div>
			<div class="flex flex-col gap-3">
				<p class="mb-1 font-serif text-2xl max-lg:text-xl">с 2015 по 2019 год</p>
				<p class="font-sans text-lg max-md:text-base">
					Компания активно развивается, расширяя зону влияния на территории России. Был проработана
					и создана новая форма взаимодействия с клиентами, создание региональной сети тренеров.
					Ежемесячно в учебном центре проходит более 15 постоянных специализированных
					семинаров-тренингов для косметологов. Учебный центр считается одним из лучших в России,
					ежегодно выпуская несколько тысяч специалистов в области шугаринга и косметологии.
				</p>
			</div>
			<div class="flex flex-col">
				<p class="border-b border-borderColor pb-6 text-xl max-lg:text-lg max-md:text-base">
					2015 год. Первая Конференция по шугарингу для представителей бренда Pandhy`s
				</p>
				<p class="border-b border-borderColor py-6 text-xl max-lg:text-lg max-md:text-base">
					2016 год. Сформирована программы карьерного роста в брендом Pandhy’s.
				</p>
				<p class="border-b border-borderColor py-6 text-xl max-lg:text-lg max-md:text-base">
					2017 год. Создание VIP клуба для самых успешных представителей.
				</p>
				<p class="pt-6 text-xl max-lg:text-lg max-md:text-base">
					2019 год. Прошла Всероссийская конференция по шугарингу в России.
				</p>
			</div>
		</div>
	</div>
</section>
