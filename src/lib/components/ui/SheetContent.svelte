<script>
	import { marked } from 'marked';
	import { twMerge } from 'tailwind-merge';

	let { content, index, classNames } = $props();
	let open = $state(false);

	function openFilters() {
		open = !open;
	}
</script>

<button
	class={twMerge(
		'flex w-full items-center justify-between rounded px-2 py-3 transition duration-300 hover:bg-bgColor  max-md:hover:bg-white',
		classNames
	)}
	onclick={openFilters}
	class:border-t={index === 0}
>
	<p class=" text-start">{content.title}</p>
	<img src="/arrow-header.svg" alt="filter icon" />
</button>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="fixed inset-0 left-0 top-0 z-50 h-dvh w-screen bg-black/30 backdrop-blur-sm transition duration-300"
	class:pointer-events-all={open}
	class:opacity-0={!open}
	class:pointer-events-none={!open}
	onclick={() => {
		open = false;
	}}
></div>

<div
	class="fixed inset-y-0 right-0 top-0 z-50 flex h-dvh w-2/5 bg-white p-5 shadow-lg transition duration-300 max-lg:w-3/5 max-sm:w-full"
	class:translate-x-[110%]={!open}
	class:translate-x-0={open}
>
	<div class="flex w-full flex-col gap-10">
		<p class="text-3xl max-md:w-11/12">{content.title}</p>
		<div
			class="rich-text-block flex h-full flex-col gap-6 overflow-y-auto overflow-x-hidden max-lg:gap-3"
		>
			{@html marked.parse(content.content)}
		</div>
		<button
			type="button"
			class="fixed right-5 top-5 h-6 w-6 p-1"
			onclick={() => {
				open = false;
			}}
		>
			<img class="w-full object-contain" src="/cross.svg" alt="cross icon" />
		</button>
	</div>
</div>
