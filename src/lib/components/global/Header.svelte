<script>
	import { page } from '$app/stores';
	import HeaderCatalog from '../ui/HeaderCatalog.svelte';
	import { getCartState, getWishlistState } from '$lib/globals.svelte';

	let cartState = getCartState();
	let wishlistState = getWishlistState();

	let { topMenu, botMenu, formState } = $props();
	

	let headerShadow = $derived(
		['/cart', '/checkout', '/catalog/[slug]', '/courses/[slug]', '/brand'].includes($page.route.id)
			? false
			: true
	);

	let topMenuNav = [
		{
			label: 'О нас',
			href: '/about'
		},
		{
			label: 'Курсы',
			href: '/courses'
		},
		{
			label: 'Расписание',
			href: '/timetable'
		},
	];
</script>

<header
	class="fixed left-0 top-0 z-30 w-full border-b border-borderColor bg-white py-6 max-md:bottom-0 max-md:top-auto max-md:border-b-0 max-md:border-t max-md:py-3"
	class:max-lg:shadow-[0_-2px_8px_0_rgb(0,0,0,0.1)]={headerShadow}
>
	<div class="container">
		<div class="grid grid-cols-[1fr_190px_1fr] gap-4 max-md:grid-cols-1">
			<nav class="flex items-center gap-6 max-md:hidden">
				<HeaderCatalog {topMenu} {botMenu} className={'max-md:hidden'} {formState} />
				<ul class="-ml-2 flex items-center gap-6">
					{#each topMenuNav as link}
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
					<!-- <li class="max-lg:hidden">
						<a href="#">
							<img src="/search.svg" alt="search icon" />
						</a>
					</li> -->
					<li>
						<a href="/wishlist">
							<img src="/favorite.svg" alt="favorite icon" />
							{#if wishlistState.products.length > 0}
								<div
									class="absolute -right-2 -top-2 flex aspect-square h-4 w-4 items-center justify-start rounded-full border border-white bg-accent p-[2px]"
								>
									<span class="w-full text-center text-[8px] text-white"
										>{wishlistState.products.length}</span
									>
								</div>
							{/if}
						</a>
					</li>

					<div class="hidden max-md:flex">
						<HeaderCatalog {topMenu} {botMenu} className={''} />
					</div>
					<li class="lg:hidden">
						<a href="/">
							<img
								class="aspect-square max-h-9 object-contain"
								src="/logoIcon.svg"
								alt="search icon"
							/>
						</a>
					</li>

					<li>
						<a href="/cart">
							<img src="/cart.svg" alt="cart icon" />
							{#if cartState.products.length > 0}
								<div
									class="absolute -right-2 -top-2 flex aspect-square h-4 w-4 items-center justify-start rounded-full border border-white bg-accent p-[2px]"
								>
									<span class="w-full text-center text-[8px] text-white"
										>{cartState.products.length}</span
									>
								</div>
							{/if}
						</a>
					</li>
					<li>
						<a href="/profile">
							<img src="/account.svg" alt="account icon" />
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</header>
