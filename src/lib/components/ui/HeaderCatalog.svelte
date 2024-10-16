<script>
	import { marked } from 'marked';
	import { fade } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';

	let open = $state(false);
	let secondMenuItems = $state([]);
	let secondLevelActive = $state(false);
	let windowWidth;

	let { className } = $props();

	function openFilters() {
		open = !open;
		secondMenuItems = [];
	}

	$effect(() => {
		windowWidth = window.innerWidth;
	});

	const secondMenu = [
		{
			label: 'САХАРНАЯ ПАСТА ДЛЯ ДЕПИЛЯЦИИ',
			href: '#'
		},
		{
			label: 'ПРЕД- И ПОСТДЕПИЛЯЦИОННЫЙ УХОД',
			href: '#'
		},
		{
			label: 'Средства ухода',
			href: '#'
		},
		{
			label: 'Фитотоники',
			href: '#'
		},
		{
			label: 'Травяные смеси',
			href: '#'
		},
		{
			label: 'Масла и масляные аромакомплексы',
			href: '#'
		},
		{
			label: 'Массажные средства',
			href: '#'
		},
		{
			label: 'Аксессуары для работы',
			href: '#'
		},
		{
			label: 'Очищающие уходы',
			href: '#'
		},
		{
			label: 'Текстиль для кабинета',
			href: '#'
		}
	];
	const topMenu = [
		{
			label: 'Новинки',
			href: '#'
		},
		{
			label: 'Акции',
			href: '#'
		},
		{
			label: 'Подборки',
			href: '#',
			subMenu: secondMenu
		},
		{
			label: 'Линейки',
			href: '#',
			subMenu: [
				{
					label: 'Фитотоники',
					href: '#'
				},
				{
					label: 'Травяные смеси',
					href: '#'
				},
				{
					label: 'Масла и масляные аромакомплексы',
					href: '#'
				},
				{
					label: 'Массажные средства',
					href: '#'
				},
				{
					label: 'Аксессуары для работы',
					href: '#'
				}
			]
		},
		{
			label: 'PANDHY`S',
			href: '#',
			subMenu: secondMenu
		},
		{
			label: 'Ella Bache',
			href: '#',
			subMenu: [
				{
					label: 'Фитотоники',
					href: '#'
				},
				{
					label: 'Травяные смеси',
					href: '#'
				},
				{
					label: 'Масла и масляные аромакомплексы',
					href: '#'
				},
				{
					label: 'Массажные средства',
					href: '#'
				},
				{
					label: 'Аксессуары для работы',
					href: '#'
				}
			]
		},
		{
			label: 'Babor',
			href: '#',
			subMenu: secondMenu
		},
		{
			label: 'Christina',
			href: '#',
			subMenu: [
				{
					label: 'Фитотоники',
					href: '#'
				},
				{
					label: 'Травяные смеси',
					href: '#'
				},
				{
					label: 'Масла и масляные аромакомплексы',
					href: '#'
				},
				{
					label: 'Массажные средства',
					href: '#'
				},
				{
					label: 'Аксессуары для работы',
					href: '#'
				}
			]
		}
	];
	const bottomMenu = [
		{
			label: 'Skin light group',
			href: '#'
		},
		{
			label: 'Покупателям',
			href: '#'
		},
		{
			label: 'Мастерам и косметологам',
			href: '#'
		},
		{
			label: 'Вакансии',
			href: '#'
		},
		{
			label: 'Связаться с нами',
			href: '#'
		}
	];
</script>

<button class={twMerge('group flex items-center gap-3', className)} onclick={openFilters}>
	<div class="z-50 flex h-7 w-[27px] flex-col gap-2 max-md:z-0">
		<span
			class="absolute top-1/2 h-[0.8px] w-full -translate-y-1 rounded bg-accent transition duration-300"
			class:rotate-45={open}
			class:translate-y-0={open}
		></span>
		<span
			class="absolute bottom-1/2 h-[0.8px] w-full translate-y-1 rounded bg-accent transition duration-300"
			class:-rotate-45={open}
			class:translate-y-px={open}
		></span>
	</div>
	<p class="text-start transition duration-300 group-hover:text-accentTextHover max-xl:text-sm max-md:hidden">
		Каталог
	</p>
</button>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div
	class="fixed inset-0 left-0 top-0 z-20 h-screen w-screen bg-black/25 transition duration-300"
	class:pointer-events-all={open}
	class:opacity-0={!open}
	class:pointer-events-none={!open}
	onclick={() => {
		open = false;
	}}
	onmouseover={() => {
		if ((window, innerWidth > 767)) {
			secondMenuItems = [];
		}
	}}
></div>

<div
	class="fixed inset-y-0 left-0 top-0 z-40 flex h-screen w-full max-w-96 bg-white pb-5 pl-5 pt-16 shadow-lg transition duration-300 max-lg:w-3/5 max-md:w-screen max-md:max-w-full max-md:pt-5"
	class:-translate-x-[110%]={!open}
	class:translate-x-0={open}
>
	<nav class="thin-scrollbar flex w-full flex-col overflow-y-auto overflow-x-visible pr-5">
		<div class="mb-4 z-30 hidden justify-between max-md:flex">
			<button
				type="button"
				onclick={() => {
					if (secondLevelActive === true) {
						secondLevelActive = false;
					} else {
						open = false;
						secondMenuItems = [];
					}
				}}
			>
				<img class="w-3 rotate-180" src="/arrow-header.svg" alt="" />
			</button>
		</div>
		<div class="flex h-full flex-col" class:-translate-x-full={secondLevelActive}>
			<div>
				<ul class="flex flex-col">
					{#each topMenu as link}
						<li class="group w-full rounded hover:bg-bgColor max-md:hover:bg-white transition duration-300">
							<!-- svelte-ignore a11y_mouse_events_have_key_events -->
							<a
								href={link.href}
								class="flex items-center justify-between px-2 py-3 max-md:px-0"
								onmouseover={() => {
									if ((window, innerWidth > 767)) {
										if (link.subMenu) {
											secondMenuItems = link.subMenu;
										} else {
											secondMenuItems = [];
										}
									}
								}}
								onclick={(e) => {
									if ((window, innerWidth < 767)) {
										if (link.subMenu) {
											e.preventDefault();
											secondMenuItems = link.subMenu;
											secondLevelActive = true;
										} else {
											secondMenuItems = [];
										}
									}
								}}
							>
								<span>{link.label}</span>
								{#if link.subMenu}
									<img class="pr-2 max-md:pr-0" src="/arrow-header.svg" alt="arrow icon" />
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="mx-2 mt-3 h-px border-t border-borderColor pt-3 max-md:mx-0"></div>
			<div>
				<ul class="flex flex-col">
					{#each bottomMenu as link}
						<!-- svelte-ignore a11y_mouse_events_have_key_events -->
						<li class="group w-full rounded hover:bg-bgColor max-md:hover:bg-white transition duration-300">
							<a
								href={link.href}
								class="flex items-center justify-between px-2 py-3 max-md:px-0"
								onmouseover={() => {
									if ((window, innerWidth > 767)) {
										secondMenuItems = [];
									}
								}}
								onclick={() => {
									if ((window, innerWidth < 767)) {
										secondMenuItems = link.subMenu;
									}
								}}
							>
								<span>{link.label}</span>
								{#if link.subMenu}
									<img class="pr-2 max-md:pr-0" src="/arrow-header.svg" alt="arrow icon" />
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="mx-2 mt-auto flex flex-col gap-6 pt-3 max-md:mx-0">
				<p>Наши подписчики в курсе всех новинок и специальных предложений</p>
				<a href="#" class="btn-dull w-full">Подписаться</a>
			</div>
		</div>

		{#if windowWidth > 767}
			{#key secondMenuItems?.length}
				<div
					class="123 fixed left-full top-0 z-30 h-screen w-full max-w-96 flex-col border-l border-borderColor bg-white pb-5 pl-5 pt-16 transition duration-75 max-md:z-20 max-md:w-screen max-md:max-w-full max-md:pt-5"
					class:flex={secondMenuItems?.length}
					class:hidden={!secondMenuItems?.length}
					class:-translate-x-full={secondLevelActive}
				>
					<ul
						class="thin-scrollbar w-full overflow-y-auto overflow-x-visible pr-5"
						in:fade={{ duration: 100 }}
					>
						{#each secondMenuItems as subLink}
							<li class="group w-full rounded hover:bg-bgColor max-md:hover:bg-white transition duration-300">
								<a
									class="flex items-center justify-between px-2 py-3 max-md:px-0"
									href={subLink.href}>{subLink.label}</a
								>
							</li>
						{/each}
					</ul>
				</div>
			{/key}
		{:else}
			<div
				class="123 flex fixed left-full top-0 z-30 h-screen w-full max-w-96 flex-col border-l border-borderColor bg-white pb-5 pl-5 pt-16 transition duration-300 max-md:z-20 max-md:w-screen max-md:max-w-full max-md:pt-5"
				class:flex={secondMenuItems?.length}
				class:hidden={!secondMenuItems?.length}
				class:-translate-x-full={secondLevelActive}
			>
				<div class="mb-4 hidden justify-between max-md:flex opacity-0 pointer-events-none">
					<button>
						<img class="w-3 rotate-180" src="/arrow-header.svg" alt="" />
					</button>
				</div>
				<ul class="thin-scrollbar w-full overflow-y-auto overflow-x-visible pr-5">
					{#each secondMenuItems as subLink}
						<li class="group w-full rounded hover:bg-bgColor max-md:hover:bg-white transition duration-300">
							<a class="flex items-center justify-between px-2 py-3 max-md:px-0" href={subLink.href}
								>{subLink.label}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</nav>
</div>
