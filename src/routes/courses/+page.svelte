<script>
	let courses = [
		{
			thumbnail: '/course.png',
			title: 'Индивидуальный тренинг',
			ul: [
				'Повышение квалификации мастера ваксинга',
				'Особенности работы в зоне бикини',
				'Сертификат об окончании',
				'Стоимость 4992 рублей'
			],
			btnText: 'Узнать больше',
			btnHref: '/courses/123',
			category: 'Курсы шугаринга'
		},
		{
			thumbnail: '/course.png',
			title: 'Индивидуальный тренинг',
			ul: [
				'Повышение квалификации мастера ваксинга',
				'Особенности работы в зоне бикини',
				'Сертификат об окончании',
				'Стоимость 4992 рублей'
			],
			btnText: 'Узнать больше',
			btnHref: '/courses/123',
			category: 'Курсы шугаринга'
		},
		{
			thumbnail: '/course.png',
			title: 'Индивидуальный тренинг',
			ul: [
				'Повышение квалификации мастера ваксинга',
				'Особенности работы в зоне бикини',
				'Сертификат об окончании',
				'Стоимость 4992 рублей'
			],
			btnText: 'Узнать больше',
			btnHref: '/courses/123',
			category: 'Курсы восковой депиляции'
		},
		{
			thumbnail: '/course.png',
			title: 'Индивидуальный тренинг',
			ul: [
				'Повышение квалификации мастера ваксинга',
				'Особенности работы в зоне бикини',
				'Сертификат об окончании',
				'Стоимость 4992 рублей'
			],
			btnText: 'Узнать больше',
			btnHref: '/courses/123',
			category: 'Обучение массажу'
		},
		{
			thumbnail: '/course.png',
			title: 'Индивидуальный тренинг',
			ul: [
				'Повышение квалификации мастера ваксинга',
				'Особенности работы в зоне бикини',
				'Сертификат об окончании',
				'Стоимость 4992 рублей'
			],
			btnText: 'Узнать больше',
			btnHref: '/courses/123',
			category: 'Эстетическая косметология'
		},
		{
			thumbnail: '/course.png',
			title: 'Индивидуальный тренинг',
			ul: [
				'Повышение квалификации мастера ваксинга',
				'Особенности работы в зоне бикини',
				'Сертификат об окончании',
				'Стоимость 4992 рублей'
			],
			btnText: 'Узнать больше',
			btnHref: '/courses/123',
			category: 'Косметология для мастера депиляции'
		},
		{
			thumbnail: '/course.png',
			title: 'Индивидуальный тренинг',
			ul: [
				'Повышение квалификации мастера ваксинга',
				'Особенности работы в зоне бикини',
				'Сертификат об окончании',
				'Стоимость 4992 рублей'
			],
			btnText: 'Узнать больше',
			btnHref: '/courses/123',
			category: 'Online курсы'
		}
	];
	let categories = new Set();
	courses.forEach((el) => categories.add(el.category));
</script>

{#snippet courseElement(content)}
	<div class=" flex flex-col gap-4">
		<img class="aspect-video rounded" src={content.thumbnail} alt="" />
		<h2 class="font-serif text-2xl">{content.title}</h2>
		<div class="rich-text-block">
			<ul class="mt-2 gap-3">
				{#each content.ul as text}
					<li>{text}</li>
				{/each}
			</ul>
		</div>
		<a class="btn-dull mt-2" href={content.btnHref}>{content.btnText}</a>
	</div>
{/snippet}

<section class="mb-20 pt-10 max-md:pt-6">
	<div class="container">
		<div class="flex flex-col gap-12 max-md:gap-6">
			<h1 class="text-2xl">Обучение</h1>
			<div
				class="grid grid-cols-[1fr_4fr] gap-4 max-lg:grid-cols-[2fr_3fr] max-md:flex max-md:flex-col max-md:gap-8"
			>
				<div class="no-scrollbar flex flex-col gap-3 max-md:flex-row max-md:overflow-x-auto">
					<a
						href="/timetable"
						class="-ml-2 w-[calc(100%+8px)] flex-shrink-0 flex-grow-0 rounded px-2 py-3 transition duration-300 hover:bg-bgColor active:bg-bgColor max-md:m-0 max-md:w-fit"
						class:max-md:bg-bgColor={true}>Расписание</a
					>
					{#each categories as category}
						<a
							href="#"
							class="-ml-2 w-[calc(100%+8px)] flex-shrink-0 flex-grow-0 rounded px-2 py-3 transition duration-300 hover:bg-bgColor active:bg-bgColor max-md:m-0 max-md:w-fit"
						>
							{category}
						</a>
					{/each}
				</div>
				<div class="grid grid-cols-2 gap-x-4 gap-y-16 max-lg:grid-cols-1 max-md:gap-y-12">
					{#each courses as course}
						{@render courseElement(course)}
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
