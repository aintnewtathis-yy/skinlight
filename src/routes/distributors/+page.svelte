<script>
	import { marked } from 'marked';

	let { data } = $props();

	const { distributors } = data;

	$inspect(distributors);
</script>

{#snippet distributorsRow(content)}
	<div
		class="rich-text-block -ml-3 grid w-[calc(100%+24px)] px-3 grid-cols-[1fr_1fr_1fr_1fr_0.5fr] gap-4 py-6 transition duration-300 hover:bg-bgColorBright focus:bg-bgColorBright active:bg-bgColorBright max-md:flex max-md:flex-col max-md:gap-10 max-md:py-4"
	>
		<p>
			{content.town}
		</p>
		<p>
			{content.representative}
		</p>
		<div class="flex flex-col gap-4">
			{@html marked.parse(content.contacts)}
		</div>
		<div class="flex flex-col gap-4">
			{@html marked.parse(content.socials)}
		</div>
		<div class="flex flex-col gap-4">
			{@html marked.parse(content.brands)}
		</div>
	</div>
{/snippet}

<section class="mb-20 pt-10 max-md:pt-6">
	<div class="container">
		<div class="flex flex-col gap-12">
			<div class="flex items-end gap-2 *:text-textDull">
				<a href="/">Главная</a>
				<span>/</span>
				<p>Дистрибьюторы</p>
			</div>
			<div class="flex flex-col gap-16 max-lg:gap-12">
				<h1 class="text-center font-serif text-6xl max-xl:text-4xl max-md:text-3xl">
					Дистрибьюторы
				</h1>
				<div class="flex flex-col gap-6 max-md:gap-4">
					{#each distributors as distributor}
						<div class="h-px w-full rounded bg-borderColor"></div>
						{@render distributorsRow(distributor)}
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
