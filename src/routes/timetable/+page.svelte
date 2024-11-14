<script>
	import HeroTimetable from '$lib/components/heroPages/HeroTimetable.svelte';
	import Seo from '$lib/components/utils/SEO.svelte';

	let { data } = $props();
	$inspect(data)
	const courses = [
		{
			title: 'Ella Bache: Обзорный видеокурс по линиям',
			date: 'Доступен всегда',
			level: 'Для всех',
			price: '1000 рублей'
		},
		{
			title: 'Ella Bache: Обзорный видеокурс по линиям',
			date: '30.09 начало в 10.00',
			level: 'Для всех',
			price: 'Бесплатно'
		},
		{
			title: 'Ella Bache: Обзорный видеокурс по линиям',
			date: 'Доступен всегда',
			level: 'Для всех',
			price: '1000 рублей'
		},
		{
			title: 'Ella Bache: Обзорный видеокурс по линиям',
			date: '30.09 начало в 10.00',
			level: 'Для всех',
			price: 'Бесплатно'
		},
		{
			title: 'Ella Bache: Обзорный видеокурс по линиям',
			date: 'Доступен всегда',
			level: 'Для всех',
			price: '1000 рублей'
		},
		{
			title: 'Ella Bache: Обзорный видеокурс по линиям',
			date: '30.09 начало в 10.00',
			level: 'Для всех',
			price: 'Бесплатно'
		},
		{
			title: 'Ella Bache: Обзорный видеокурс по линиям',
			date: 'Доступен всегда',
			level: 'Для всех',
			price: '1000 рублей'
		},
		{
			title: 'Ella Bache: Обзорный видеокурс по линиям',
			date: '30.09 начало в 10.00',
			level: 'Для всех',
			price: 'Бесплатно'
		}
	];
</script>

<Seo
	title={data?.data.seo?.title}
	description={data?.data.seo?.description}
	image={data?.data.seo?.image}
/>

{#snippet courseRow(content, index)}
	{@const date = new Date(content.date)}
	{@const dateVisual = `${String(date.getUTCDate()).padStart(2, '0')}.${String(date.getUTCMonth() + 1).padStart(2, '0')} начало в ${String(date.getUTCHours()).padStart(2, '0')}.${String(date.getUTCMinutes()).padStart(2, '0')} `}
	<a
		class="-ml-3 grid w-[calc(100%+24px)] grid-cols-[1.5fr_4fr_2.5fr] items-center gap-16 px-3 py-6 *:w-full *:text-lg hover:bg-bgColor focus:bg-bgColor active:bg-bgColor max-xl:grid-cols-[2fr_4fr_2.5fr] max-xl:gap-8 *:max-xl:text-base max-lg:py-4 max-md:flex max-md:flex-col *:max-md:text-lg"
		href={content.href}
	>
		<p>{dateVisual}</p>
		<p class="flex items-start gap-2">
			<span class="mt-[10px] h-2 w-2 rounded-full bg-[#CFBBA5] max-xl:mt-2 max-md:mt-[10px]"></span>
			<span>{content.title}</span>
		</p>
		<div
			class="grid grid-cols-[1fr_1.5fr] gap-16 max-lg:gap-8 max-md:mt-4 max-md:flex max-md:justify-between"
		>
			<p>{content.level}</p>
			<p>{content.price}</p>
		</div>
	</a>
{/snippet}

<HeroTimetable sliderContent = {data?.data} />

<section id="timetable">
	<div class="container">
		<div class="flex flex-col gap-16">
			<h2 class="text-center font-serif text-3xl">Ближайшие обучающие программы</h2>
			<div class="group123 group1 flex flex-col gap-6 max-md:gap-4">
				{#each data?.data?.timetableEntity as course, i}
					<div class="h-px w-full rounded bg-borderColor"></div>
					{@render courseRow(course, i)}
				{/each}
			</div>
		</div>
	</div>
</section>

<section>
	<div class="container">
		<div
			class="rich-text-block mx-auto flex w-3/5 flex-col gap-16 *:text-lg max-xl:w-4/5 max-lg:w-full max-md:gap-14 max-md:*:text-base"
		>
			<div class="flex flex-col gap-6 max-md:gap-4">
				<h3 class="heading">
					Система поэтапного обучения с присвоением соответствующей квалификации способствует
					быстрому профессиональному росту специалистов и гарантирует соответствие высоким
					стандартам процедуры сахарной депиляции.
				</h3>
				<p>
					Это выводит сахарную депиляцию Pandhy`s на новый уровень развития, повышает уровень
					мастерства специалистов, превращая их в уникальных экспертов, востребованных на рынке
					косметологии. Учебный центр шугаринга и косметологии был создан для обучения
					шугарингу специалистов высокого уровня.Специалисты, прошедшие обучение по нашим
					программам, всегда высоко ценятся в сфере бьюти-бизнеса и реализуют себя как успешные
					мастера. Сертификаты, выдаваемые в нашей школе, признаются во всем мире. С июля 2016 года
					мы выдаем международный паспорт Pandhy`s.
				</p>
			</div>
			<div>
				<h4 class="heading">
					Для специалистов, решивших пройти курс обучения по программам Учебного центра «Скин Лайт»
					действует многоуровневая система повышения квалификации.
				</h4>
			</div>
			<div class="flex flex-col gap-6 max-md:gap-4">
				<div class="flex flex-col gap-4">
					<h6 class="heading">Мастер</h6>
					<p>
						Квалификация «Мастер» присваивается после прохождения базового семинара-тренинга по
						обучению сахарной депиляции Pandhy`s или после тренинга Коррекция техники сахарной
						депиляции (в том случае, если обучение проходило на другом бренде).При прохождении
						экспресс-курса квалификация Мастер присваивается успешной сдачи теоретического и
						практического экзамена.
					</p>
				</div>
				<div class="h-px w-full bg-[#EAE9E5]"></div>
				<div class="flex flex-col gap-6">
					<h6 class="heading">Специалист</h6>
					<p>
						Квалификация «Специалист» присваивается мастерам, которые не менее трех месяцев успешно
						работают на нашем бренде и прошли два тренинга повышения квалификации 
						<a href="#">Методика работы мягкими пастами</a>
						и <a href="#">спа-уходы Pandhy`s</a>.
					</p>
				</div>
				<div class="h-px w-full bg-[#EAE9E5]"></div>
				<div class="flex flex-col gap-6">
					<h6 class="heading">Эксперт</h6>
					<p>
						Квалификация «Эксперт» присваивается после 6 месяцев успешной работы с продукцией
						Pandhy`s и прохождения углубленного тренинга Pandhy`s - эксперт, на котором
						рассматриваются медицинские аспекты депиляции, вопросы позиционирования и продвижения.
					</p>
				</div>
				<div class="h-px w-full bg-[#EAE9E5]"></div>
				<div class="flex flex-col gap-6">
					<h6 class="heading">Технолог</h6>
					<p>
						Квалификация «Технолог» присваивается региональным представителям Pandhy`s, экспертам,
						оказывающим сервисную поддержку клиентам, занимающимся подготовкой мастеров Пандис,
						консультирующим по всей продукции для депиляции и ухода за кожей.
					</p>
				</div>
			</div>
			<div>
				<h6 class="heading">
					На каждом этапе происходит аттестация учащихся с вручением соответствующего знака
					и сертификата. Все достижения, пройденные семинары и тренинги, участие в конференциях и
					круглых столах фиксируются в международном паспорте Pandhy`s .
				</h6>
			</div>
			<div class="flex flex-col gap-6 max-md:gap-4">
				<p class="heading">
					Уточнить сколько стоит обучение шугарингу, узнать цену и расписание курсов можно по
					телефонам:
				</p>
				<ul>
					<li>
						<a href="tel:+74956091010">+7 (495) 609-10-10</a>
						,
						<a href="tel:+79854574577">+7 (985) 457-45-77</a>
					</li>
					<li>
						WhatsApp: <a href="+79039636903">+7 (903) 963-69-03</a>
					</li>
				</ul>
			</div>
			<div>
				<p class="heading">
					Если вам нужна помощь с выбором обучающей программы или остались вопросы, пожалуйста, <a
						class="font-serif"
						href="#">свяжитесь с нами</a
					>.
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	ul {
		@apply gap-6 max-md:gap-4;
	}
</style>
