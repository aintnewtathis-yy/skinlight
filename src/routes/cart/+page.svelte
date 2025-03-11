<script>
	import { enhance } from '$app/forms';
	import { CMS_URL, deliveryContent, profiContent } from '$lib/globals.js';
	import Promocode from '$lib/components/ui/Promocode.svelte';
	import { getToastState, getCartState } from '$lib/globals.svelte';
	import { page } from '$app/stores';
	import Seo from '$lib/components/utils/SEO.svelte';
	import SheetContent from '$lib/components/ui/SheetContent.svelte';

	let { data, form } = $props();

	let formState = $state(form ?? null);
	let toastState = getToastState();
	let cartState = getCartState();
	let open = $state(false);

	let firstName = $state(data?.user?.firstName ?? '');
	let secondName = $state(data?.user?.secondName ?? '');
	let address = $state(data?.user?.address ?? '');
	let phone = $state(data?.user?.phone ?? '');
	let email = $state(data?.user?.email ?? '');

	let total = $derived.by(() => {
		let price = data.user?.masterStatus === 'Проверен' ? cartState.totalRUBOpt : cartState.totalRUB;

		return parseInt(
			cartState.promocode ? price - (price * cartState.promocode.discount) / 100 : price
		);
	});
	let discount = $derived.by(() => {
		let price = data.user?.masterStatus === 'Проверен' ? cartState.totalRUBOpt : cartState.totalRUB;

		let priceGap =
			data.user?.masterStatus === 'Проверен' ? cartState.totalRUB - cartState.totalRUBOpt : 0;

		return parseInt(
			cartState.promocode ? priceGap + (price * cartState.promocode.discount) / 100 : priceGap
		);
	});

	$effect(() => {
		formState = form ?? null;
	});

    $inspect(data?.user?.masterStatus === "Проверен")
</script>

<Seo title={'Корзина'} description={'Корзина'} />

{#snippet cartElement(content)}
	{@const thumbnailSrc = content.thumbnail?.formats?.thumbnail?.url ?? content.thumbnail?.url}
	<div
		class="grid grid-cols-[1fr_3fr_1.5fr] gap-6 max-md:grid-cols-[2fr_2fr_1fr] max-md:gap-4"
		data-id={content.documentId}
	>
		<a
			href={'/catalog/' + content.brand.seo.slug + '/' + content.seo.slug}
			class=" flex items-center justify-center rounded border border-borderColor bg-[#FAFAFA] px-3"
		>
			<img
				class="my-auto aspect-square w-full rounded object-contain"
				src={CMS_URL + thumbnailSrc}
				alt=""
			/>
		</a>
		<div
			class="grid grid-cols-[2fr_1fr] gap-6 max-md:flex max-md:flex-col max-md:justify-between max-md:gap-4"
		>
			<div class="flex flex-col gap-3">
				<a href={'/catalog/' + content.brand.seo.slug + '/' + content.seo.slug}>
					<p class="font-serif max-md:text-sm">{content.name}</p>
				</a>
				<p class="text-xs text-textDull max-md:text-[10px]">Артикул: {content.SKU}</p>
			</div>
			<div>
				<div class="w-fit">
					<input
						class="w-28 rounded border border-borderColor px-7 py-3 text-center leading-none"
						type="number"
						value={content.quantity}
					/>
					<button
						class="absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2"
						type="button"
						onclick={() => {
							++content.quantity;
						}}
					>
						<img src="/plus.svg" alt="plus icon" />
					</button>
					<button
						class="absolute left-4 top-1/2 h-3 w-3 -translate-y-1/2"
						type="button"
						onclick={() => {
							if (content.quantity > 1) {
								--content.quantity;
							}
						}}
					>
						<img src="/minus.svg" alt="plus icon" />
					</button>
				</div>
			</div>
		</div>
		<div
			class="grid grid-cols-[2fr_1fr] gap-6 max-md:flex max-md:flex-col max-md:justify-between max-md:gap-4"
		>
			{#if $page.data?.user?.masterStatus === 'Проверен'}
				<p class="py-3 text-center max-md:py-0 max-md:text-end max-md:text-sm">
					<span>{content.priceRUBOpt * content.quantity} руб</span>
					<!-- <span class=" line-through ">{content.priceRUB * content.quantity} руб</span> -->
				</p>
			{:else}
				<p class="py-3 text-center max-md:py-0 max-md:text-end max-md:text-sm">
					{content.priceRUB * content.quantity} руб
				</p>
			{/if}

			<div class="flex items-start py-3 max-lg:justify-end">
				<button
					type="button"
					onclick={() => {
						cartState.remove(content.documentId);
					}}
				>
					<img src="/trash.svg" alt="bin icon" />
				</button>
			</div>
		</div>
	</div>
{/snippet}
<section>
	<div class="container">
		{#if cartState.products.length > 0}
			<div class="mx-auto flex w-3/5 flex-col gap-12 pt-12 max-xl:w-4/5 max-lg:w-full max-md:pt-8">
				<div>
					<div class="flex flex-col gap-12 max-md:gap-8">
						{#each cartState.products as product}
							{@render cartElement(product)}
						{/each}
					</div>
				</div>
				<div
					class="grid grid-cols-[2fr_1fr] gap-4 overflow-y-auto border-t border-borderColor pt-12 transition duration-300 max-lg:grid-cols-[3fr_2fr] max-md:fixed max-md:bottom-[60px] max-md:pb-20 max-md:left-0 max-md:top-0 max-md:z-20 max-md:flex max-md:h-[calc(100vh-60px)] max-md:flex-col max-md:gap-10 max-md:bg-white max-md:p-5"
					class:max-md:-translate-x-full={!open}
					class:max-md:translate-x-0={open}
				>
					<div class="flex flex-col gap-10">
						<div class="flex items-start justify-between">
							<Promocode {formState} />
							<button
								type="button"
								class="text-sm md:hidden"
								onclick={() => {
									open = false;
								}}
							>
								<img src="/cross.svg" alt="" />
							</button>
						</div>
						<div class="flex flex-col gap-8">
							<div class="flex flex-col gap-2">
								<div
									class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
								>
									<label for="email5" class="text-sm">Email</label>
									<input
										class="basic-input max-md:w-full"
										name="email"
										type="text"
										placeholder="example@mail.ru"
										bind:value={email}
										oninput={() => {
											if (formState?.errors?.email) {
												formState.errors.email = '';
											}
										}}
										class:border-error={formState?.errors?.email}
									/>
								</div>
								{#if formState?.errors?.email}
									<div
										class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
									>
										<p></p>
										<p class="px-2 text-xs text-error">{formState.errors.email[0]}</p>
									</div>
								{/if}
							</div>

							<div class="flex flex-col gap-2">
								<div
									class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
								>
									<label for="firstName" class="text-sm">Имя</label>
									<input
										class="basic-input max-md:w-full"
										name="firstName"
										type="text"
										placeholder="Иван"
										bind:value={firstName}
										oninput={() => {
											if (formState?.errors?.firstName) {
												formState.errors.firstName = '';
											}
										}}
										class:border-error={formState?.errors?.firstName}
									/>
								</div>
								{#if formState?.errors?.firstName}
									<div
										class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
									>
										<p></p>
										<p class="px-2 text-xs text-error">{formState.errors.firstName[0]}</p>
									</div>
								{/if}
							</div>

							<div class="flex flex-col gap-2">
								<div
									class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
								>
									<label for="secondName" class="text-sm">Фамилия</label>
									<input
										class="basic-input max-md:w-full"
										name="secondName"
										type="text"
										placeholder="Иванов"
										bind:value={secondName}
										oninput={() => {
											if (formState?.errors?.secondName) {
												formState.errors.secondName = '';
											}
										}}
										class:border-error={formState?.errors?.secondName}
									/>
								</div>
								{#if formState?.errors?.secondName}
									<div
										class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
									>
										<p></p>
										<p class="px-2 text-xs text-error">{formState.errors.secondName[0]}</p>
									</div>
								{/if}
							</div>

							<div class="flex flex-col gap-2">
								<div
									class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
								>
									<label for="phone" class="text-sm">Телефон</label>
									<input
										class="basic-input max-md:w-full"
										name="phone"
										type="text"
										placeholder="+79923231351"
										bind:value={phone}
										oninput={() => {
											if (formState?.errors?.phone) {
												formState.errors.phone = '';
											}
										}}
										class:border-error={formState?.errors?.phone}
									/>
								</div>
								{#if formState?.errors?.phone}
									<div
										class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
									>
										<p></p>
										<p class="px-2 text-xs text-error">{formState.errors.phone[0]}</p>
									</div>
								{/if}
							</div>

							<div class="flex flex-col gap-2">
								<div
									class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
								>
									<label for="address" class="text-sm">Адрес</label>
									<input
										class="basic-input max-md:w-full"
										name="address"
										type="text"
										placeholder="Москва, ул. Дубнинская, д. 43"
										bind:value={address}
									/>
								</div>
							</div>
						</div>
					</div>
					<div class="ml-10 flex flex-col gap-10 max-lg:ml-2 max-md:m-0">
						<nav class="max-md:hidden">
							<ul class="flex flex-col">
								{#if !data?.user}
									<li
										class="group w-full rounded transition duration-300 hover:bg-bgColor max-md:hover:bg-white"
									>
										<a
											class="flex items-center justify-between px-2 py-3 max-md:px-0"
											href="/login"
										>
											<span>Войти в личный кабинет</span>
											<img src="/arrow-header.svg" alt="arrow icon" />
										</a>
									</li>
								{/if}
								<li>
									<SheetContent content={deliveryContent} />
								</li>
								<li
									class="group w-full rounded transition duration-300 hover:bg-bgColor max-md:hover:bg-white"
								>
									<SheetContent content={profiContent} />
								</li>
							</ul>
						</nav>
						<div class="flex flex-col gap-6 max-md:gap-4">
							{#if cartState.promocode}
								<p class="flex items-end justify-between gap-4 max-md:justify-center">
									<span class="text-sm max-md:text-base">Промокод:</span>
									<span class="text-sm max-md:text-base">{cartState.promocode.promocode}</span>
								</p>
							{/if}
							{#if cartState.promocode || data?.user?.masterStatus === 'Проверен'}
								<p class="flex items-end justify-between gap-4 max-md:justify-center">
									<span class="text-sm max-md:text-base">Скидка:</span>
									<span class="text-sm max-md:text-base">{discount} руб</span>
								</p>
							{/if}
							<p class="flex items-end justify-between gap-4 max-md:justify-center">
								<span class="text-sm max-md:text-base">Итого:</span>
								<span class="text-xl max-md:text-base">{total} руб</span>
							</p>
							<div class="mt-4 flex flex-col gap-4">
								<form
									method="POST"
									use:enhance={(e) => {
										return async ({ update, result }) => {
											await update();

											if (result.status === 303) {
												cartState.products = [];
											} else if (result.status === 400) {
												toastState.add('Что-то пошло не так');
											}
										};
									}}
									action="?/buy"
								>
									<input
										type="hidden"
										name="cartData"
										value={JSON.stringify({
											order_status: 'Ожидает оплату',
											total: total,
                                            discount: discount,
											order_id: crypto.randomUUID(),
											products: cartState.products.map((p) => ({
												product: { connect: [p.documentId] },
												quantity: p.quantity,
												title: p.name
											})),
											promocode: cartState.promocode,
											userData: {
												firstName: firstName,
												secondName: secondName,
												phone: phone,
												address: address,
												email: email,
                                                isMaster: data?.user?.masterStatus === "Проверен"
											},
											userDocumentId: data?.user?.documentId ?? null
										})}
									/>

									<button class="btn w-full" type="submit">Оплатить заказ</button>
								</form>
								<p class="text-sm max-md:text-center">
									Нажимая на кнопку «оплатить заказ», я принимаю
									<a class="underline" href="/legal/offerta">условия публичной оферты</a>
									и <a class="underline" href="/legal/policy">политики конфиденциальности</a>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="fixed bottom-[60px] left-0 hidden w-full bg-white px-5 py-2 max-md:flex">
					<button
						type="button"
						class="btn w-full"
						onclick={() => {
							open = true;
						}}
					>
						Оформить заказ
					</button>
				</div>
			</div>
		{:else}
			<div class="mt-48 flex flex-col gap-10 max-md:mt-24">
				<h1 class="sr-only">Корзина</h1>
				<div
					class="mx-auto flex h-full max-w-[300px] flex-col items-center justify-center gap-4 max-md:h-[60vh]"
				>
					<svg
						width="32"
						height="40"
						viewBox="0 0 16 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4.50002 6.50002H0.5L0.50001 18.5C0.50001 19.0523 0.94772 19.5 1.50001 19.5H14.5C15.0523 19.5 15.5 19.0523 15.5 18.5V6.50002H11.5M4.50002 6.50002H11.5M4.50002 6.50002L4.5 7.50001M4.50002 6.50002L4.5 4.00001C4.5 2.06701 6.067 0.5 8 0.5C9.933 0.5 11.5 2.06701 11.5 4.00001V6.50002M11.5 6.50002V7.50001"
							stroke="#897E79"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>

					<h2 class="font-serif text-2xl">Корзина пока пуста</h2>
					<p class="text-balance text-center text-sm text-textDull">
						Здесь вы сможете оформить заказ
					</p>
					<a href="/catalog" class="btn-bordered mt-3">Перейти в каталог</a>
				</div>
			</div>
		{/if}
	</div>
</section>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="fixed inset-0 left-0 top-0 z-10 h-screen w-screen bg-black/30 backdrop-blur-sm transition duration-300"
	class:pointer-events-all={open}
	class:opacity-0={!open}
	class:pointer-events-none={!open}
	onclick={() => {
		open = false;
	}}
></div>

<style global>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
