<script>
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
	import { marked } from 'marked';

	let { data } = $props();
</script>

<section class="mb-20 pt-10 max-md:pt-6">
	<div class="container">
		<div class="flex flex-col gap-12">
			<div class="flex items-end gap-2 *:text-textDull">
				<a href="/">Главная</a>
				<span>/</span>
				<p>Контакты</p>
			</div>
			<div class="mx-auto flex w-3/5 flex-col gap-6 max-lg:w-full rich-text-block">
				<h1 class="max-md:2xl font-serif text-3xl">{data?.title}</h1>
				<p>
					{data?.description}
				</p>
				<div class="mt-3 flex flex-col gap-6">
					{#each data?.contactsBlock as block}
						<div class="flex flex-col gap-4">
							<p>{block.label}</p>
							<div class="flex flex-col gap-3">
								{#each block.contactsBlockContent as childBlock}
									<div class="flex items-center gap-2">
										<div class="h-2 w-2 rounded-full bg-[#CFBBA5] aspect-square "></div>
										<p>{@html marked.parse(childBlock.content)}</p>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.styled-block a {
		color: #c6a07d;
	}
	.styled-block a:hover {
		opacity: 0.8;
	}
</style>
