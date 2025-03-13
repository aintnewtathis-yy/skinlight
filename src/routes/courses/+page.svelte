<script>
	import { CMS_URL } from '$lib/globals.js';
	import { page } from '$app/stores';
	import { marked } from 'marked';
	import Seo from '$lib/components/utils/SEO.svelte';
	let { data } = $props();
	let { courses, categories } = data;
	let params = $state($page.url.searchParams);
	let currentFilter = $derived(params.get('category') ?? '');

	const getFilteredCourses = (courses, currentFilter) => {
		if (currentFilter === '') return courses;
		return courses.filter((course) => course.category.seo.slug === currentFilter);
	};

	const filteredCourses = $derived.by(() => getFilteredCourses(courses, currentFilter));

	$effect(() => {
		params = $page.url.searchParams;
	});
</script>

<Seo
	title={"Обучающие программы по шугарингу и косметологии центра Скин Лайт"}
	description={"Учебный центр Скин Лайт: обучающие программы по шугарингу и косметологии. Курсы шугаринга - сахарной депиляции, обучение массажам, эстетическая косметология."}
/>


{#snippet courseElement(content)}
	{@const imageSrc = content.heroCourses?.image?.formats?.large?.url
		? CMS_URL + content.heroCourses?.image?.formats?.large?.url
		: CMS_URL + content.heroCourses?.image?.url}
	<div class=" flex flex-col gap-4">
		<img
			class="aspect-video w-full rounded"
			src={imageSrc}
			width={content.heroCourses?.image?.width}
			height={content.heroCourses?.image?.height}
			alt={content.heroCourses?.image?.alternativeText ?? ''}
		/>
		<h2 class="font-serif text-2xl">{content.heroCourses?.title}</h2>
		<div class="rich-text-block">
			{@html marked.parse(content.bullets)}
		</div>
		<a class="btn-dull mt-2" href={'/courses/' + content.seo.slug}>Узнать больше</a>
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
					>
						Расписание
					</a>
					<a
						href="/courses"
						class="-ml-2 w-[calc(100%+8px)] flex-shrink-0 flex-grow-0 rounded px-2 py-3 transition duration-300 hover:bg-bgColor active:bg-bgColor max-md:m-0 max-md:w-fit"
						class:bg-bgColor={currentFilter === ''}
					>
						Все категории
					</a>
					{#each categories as category}
						<a
							class:bg-bgColor={currentFilter === category.seo.slug}
							href={'?category=' + category.seo.slug}
							class="-ml-2 w-[calc(100%+8px)] flex-shrink-0 flex-grow-0 rounded px-2 py-3 transition duration-300 hover:bg-bgColor active:bg-bgColor max-md:m-0 max-md:w-fit"
						>
							{category.title}
						</a>
					{/each}
				</div>
				<div class="grid grid-cols-2 gap-x-4 gap-y-16 max-lg:grid-cols-1 max-md:gap-y-12">
					{#each filteredCourses as course}
						{#key filteredCourses}
							{@render courseElement(course)}
						{/key}
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
