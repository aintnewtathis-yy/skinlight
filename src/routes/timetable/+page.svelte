<script>
	import HeroTimetable from '$lib/components/heroPages/HeroTimetable.svelte';

	const courses = [
		{
			title: 'Ella Bache: Обзорный видеокурс по линиям',
			date: 'Доступен всегда',
			level: 'Для всех',
			price: 'Бесплатно'
		},
		{
			title: 'Ella Bache: Обзорный видеокурс по линиям',
			date: 'Доступен всегда',
			level: 'Для всех',
			price: 'Бесплатно'
		},
		{
			title: 'Ella Bache: Обзорный видеокурс по линиям',
			date: 'Доступен всегда',
			level: 'Для всех',
			price: 'Бесплатно'
		},
		{
			title: 'Ella Bache: Обзорный видеокурс по линиям',
			date: 'Доступен всегда',
			level: 'Для всех',
			price: 'Бесплатно'
		},
		{
			title: 'Ella Bache: Обзорный видеокурс по линиям',
			date: 'Доступен всегда',
			level: 'Для всех',
			price: 'Бесплатно'
		},
		{
			title: 'Ella Bache: Обзорный видеокурс по линиям',
			date: 'Доступен всегда',
			level: 'Для всех',
			price: 'Бесплатно'
		},
		{
			title: 'Ella Bache: Обзорный видеокурс по линиям',
			date: 'Доступен всегда',
			level: 'Для всех',
			price: 'Бесплатно'
		},
		{
			title: 'Ella Bache: Обзорный видеокурс по линиям',
			date: 'Доступен всегда',
			level: 'Для всех',
			price: 'Бесплатно'
		}
	];
</script>

{#snippet courseRow(content)}
	<a
		class="grid grid-cols-[1fr_4fr_1fr_1.5fr] gap-16 py-6 *:text-lg max-lg:py-4 hover:bg-bgColor focus:bg-bgColor active:bg-bgColor *:max-xl:text-base"
		href={content.href}
	>
		<p>{content.date}</p>
		<p class="flex items-center gap-2">
			<span class="h-2 w-2 rounded-full bg-[#CFBBA5]"></span>
			<span>{content.title}</span>
		</p>
		<p>{content.level}</p>
		<p>{content.price}</p>
	</a>
{/snippet}

<HeroTimetable />
<section id="timetable">
	<div class="container">
		<div class="flex flex-col gap-16">
			<h2 class="text-center font-serif text-3xl max-lg:w-2/3">Ближайшие обучающие программы</h2>
			<div class="flex flex-col gap-6">
				{#each courses as course}
					<div class="h-px w-full bg-borderColor"></div>
					{@render courseRow(course)}
				{/each}
			</div>
		</div>
	</div>
</section>
