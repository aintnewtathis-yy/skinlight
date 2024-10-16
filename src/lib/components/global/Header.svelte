<script>
	import HeaderCatalog from '../ui/HeaderCatalog.svelte';

	const topMenu = [
		{
			label: 'Обучение',
			href: '#'
		},
		{
			label: 'О нас',
			href: '/about'
		},
		{
			label: 'Дистрибьюторы',
			href: '#'
		},
		{
			label: 'Контакты',
			href: '#'
		}
	];
</script>

<header
	class="fixed left-0 top-0 z-50 w-full border-b border-borderColor bg-white py-6 max-md:bottom-0 max-md:top-auto max-md:border-b-0 max-md:border-t max-md:py-4"
>
	<div class="container">
		<div class="grid grid-cols-[1fr_190px_1fr] gap-4 max-md:grid-cols-1">
			<nav class="flex items-center gap-6 max-md:hidden">
				<HeaderCatalog className={'max-md:hidden'} />
				<ul class="flex items-center gap-6 -ml-2">
					{#each topMenu as link}
						<li class="transition duration-300 hover:text-accentTextHover max-xl:hidden">
							<a class="px-2 py-3 max-md:px-0" href={link.href}>{link.label}</a>
						</li>
					{/each}
				</ul>
			</nav>
			<a href="/" class="flex items-center justify-center max-md:hidden">
				<img src="/logo.svg" alt="logo" />
			</a>
			<nav class="flex items-center justify-end max-md:w-full">
				<ul class="flex items-center justify-end gap-7 max-md:w-full max-md:justify-between">
					<li>
						<a href="#">
							<img src="/search.svg" alt="search icon" />
						</a>
					</li>
					<li>
						<a href="#">
							<img src="/favorite.svg" alt="favorite icon" />
						</a>
					</li>

					<div class="hidden max-md:flex">
						<HeaderCatalog className="" />
					</div>

					<li>
						<a href="/cart">
							<img src="/cart.svg" alt="cart icon" />
						</a>
					</li>
					<li>
						<a href="#">
							<img src="/account.svg" alt="account icon" />
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</header>
