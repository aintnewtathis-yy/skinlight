<script>
	import Seo from '$lib/components/utils/SEO.svelte';
	import { CMS_URL } from '$lib/globals.js';
	import { page } from '$app/stores';
	import { getToastState } from '$lib/globals.svelte';
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let formState = $state(form ?? null);
	let paramsState = $state($page.url.searchParams);
	let currentPage = $derived(paramsState.get('page') ?? '');

	let toastState = getToastState();

	let firstName = $state(data?.user?.firstName ?? '');
	let secondName = $state(data?.user?.secondName ?? '');
	let address = $state(data?.user?.address ?? '');
	let phone = $state(data?.user?.phone ?? '');
	let email = $state(data?.user?.email ?? '');
	let certificates = $state(data?.user?.certificates);

	$effect(() => {
		paramsState = $page.url.searchParams;
		formState = form ?? null;
	});
</script>

<Seo
	title={'Профиль'}
	description={'Профиль'}
/>

{#snippet miniCard(content, quantity)}
	{@const src = content?.thumbnail?.formats?.large?.url ?? content?.thumbnail?.url}
	<div class="grid grid-cols-[1fr_2fr] gap-6">
		<div
			class="flex h-full w-full items-center justify-center overflow-hidden rounded-sm border border-[#EAE9E5] bg-[#FAFAFA] px-5 max-md:px-0"
		>
			<img
				class="h-full w-full max-w-24 object-contain"
				src={CMS_URL + src}
				alt={content?.thumbnail?.alternativeText}
				width={content?.thumbnail?.width}
				height={content?.thumbnail?.height}
			/>
		</div>
		<div class="flex flex-col gap-2">
			<h2 class="font-serif">{content?.name}</h2>
			<div class="flex gap-1">
				<p class="whitespace-nowrap text-xs text-textDull">Артикул: {content?.SKU}</p>
				<p class="whitespace-nowrap text-xs text-textDull">{quantity} шт</p>
			</div>
			<h3 class="mt-2">{content?.priceRUB * quantity} руб</h3>
		</div>
	</div>
{/snippet}

<!-- <pre>
    {JSON.stringify(data, null, 2)}
</pre> -->

<section class="mb-20 pt-6 max-md:pt-6">
	<div class="container">
		<div class="flex flex-col gap-12 max-md:gap-6">
			<div class="flex items-end gap-2 *:text-textDull">
				<a href="/">Главная</a>
				<span>/</span>
				<a href="/catalog">Профиль</a>
			</div>
			<div class="grid grid-cols-[1fr_4fr] gap-4 max-lg:flex max-lg:flex-col max-lg:gap-8">
				<div>
					<div
						class="no-scrollbar sticky top-[86px] flex flex-col gap-3 max-lg:relative max-lg:top-auto max-lg:flex-row max-lg:overflow-x-auto"
					>
						<a
							href="?page=orders"
							class="-ml-2 w-[calc(100%+8px)] flex-shrink-0 flex-grow-0 rounded px-2 py-3 transition duration-300 hover:bg-bgColor active:bg-bgColor max-lg:m-0 max-lg:w-fit"
							class:bg-bgColor={currentPage === 'orders' || currentPage === ''}
						>
							Заказы
						</a>
						<a
							href="?page=personal"
							class="-ml-2 w-[calc(100%+8px)] flex-shrink-0 flex-grow-0 rounded px-2 py-3 transition duration-300 hover:bg-bgColor active:bg-bgColor max-lg:m-0 max-lg:w-fit"
							class:bg-bgColor={currentPage === 'personal'}
						>
							Личные данные
						</a>
						<a
							href="?page=master"
							class="-ml-2 w-[calc(100%+8px)] flex-shrink-0 flex-grow-0 rounded px-2 py-3 transition duration-300 hover:bg-bgColor active:bg-bgColor max-lg:m-0 max-lg:w-fit"
							class:bg-bgColor={currentPage === 'master'}
						>
							Статус мастера
						</a>
						<a
							href="/logout"
							class="-ml-2 w-[calc(100%+8px)] flex-shrink-0 flex-grow-0 rounded px-2 py-3 transition duration-300 hover:bg-bgColor active:bg-bgColor max-lg:m-0 max-lg:w-fit"
						>
							Выйти
						</a>
					</div>
				</div>
				<div class="flex flex-col gap-12">
					{#if currentPage === 'orders' || currentPage === ''}
						{#if data.user?.orders.length > 0}
							<h1 class="sr-only">Заказы</h1>
							{#each data.user.orders as order, i}
								<div
									class="flex w-4/5 flex-col gap-3 max-xl:w-full"
									class:pt-4={i > 0}
									class:border-t={i > 0}
									class:border-borderColor={i > 0}
								>
									<a href={`/order/${order.documentId}`} class="flex items-center gap-2">
										<h2 class="font-serif text-lg">№{order.id} - {order.total} руб</h2>
										<img src="/arrow-header.svg" alt="arrow icon" />
									</a>
									<div class="flex items-center gap-2">
										<div class="h-[5px] w-[5px] rounded-full bg-[#CFBBA5]"></div>
										<p class="text-sm">Статус заказа: {order.orderStatus}</p>
									</div>
									<div
										class="mt-3 grid grid-cols-2 gap-x-12 gap-y-8 max-md:flex max-md:flex-col max-md:gap-6"
									>
										{#each order.products as card}
											{@render miniCard(card.product, card.quantity)}
										{/each}
									</div>
								</div>
							{/each}
						{:else}
							<div class=" flex flex-col gap-10">
								<h1 class="sr-only">Заказы</h1>
								<div
									class="mx-auto flex h-full max-w-[300px] flex-col items-center justify-center gap-4 max-md:h-[60vh]"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										stroke="#897E79"
										width="40"
										height="50"
										viewBox="0 0 24 24"
										><path
											color="#897E79"
											d="M12.5 3V7.5C12.5 8.05228 12.9477 8.5 13.5 8.5H18M15.5 12.5H8.5M15.5 16.5H8.5M9.5 8.5H8.5M18.2071 8.20711L12.7929 2.79289C12.6054 2.60536 12.351 2.5 12.0858 2.5H6.50002C5.94774 2.5 5.50002 2.94771 5.50002 3.5L5.5 20.5C5.5 21.0523 5.94771 21.5 6.5 21.5H17.5C18.0523 21.5 18.5 21.0523 18.5 20.5V8.91421C18.5 8.649 18.3946 8.39464 18.2071 8.20711Z"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1"
											vector-effect="non-scaling-stroke"
										></path></svg
									>

									<h2 class="font-serif text-2xl">Заказов пока нет</h2>
									<p class="text-balance text-center text-sm text-textDull">
										Здесь вы увидете свои заказы
									</p>
									<a href="/catalog" class="btn-bordered mt-3">Перейти в каталог</a>
								</div>
							</div>
						{/if}
					{:else if currentPage === 'personal'}
						<div class="flex w-3/5 flex-col gap-12 max-xl:w-full">
							<div class="flex flex-col gap-8">
								<div class="flex flex-col gap-2">
									<div
										class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
									>
										<label for="email" class="text-sm">Email</label>
										<input
											disabled
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
							<form
								method="POST"
								use:enhance={(e) => {
									return async ({ update, result }) => {
										await update();

										if (result.status !== 200) {
											toastState.add('Что-то пошло не так');
										} else {
											toastState.add('Информация обновлена');
										}
									};
								}}
								action="?/changePersonalInfo"
							>
								<input
									type="hidden"
									name="userData"
									value={JSON.stringify({
										userData: {
											firstName: firstName,
											secondName: secondName,
											phone: phone,
											address: address
										}
									})}
								/>

								<button class="btn ml-auto max-md:w-full" type="submit">Сохранить</button>
							</form>
						</div>
					{:else if currentPage === 'master'}
						<div class="flex w-3/5 flex-col gap-12 max-xl:w-full">
							{#if data?.user.masterStatus === 'Не заверен'}
								<div class="flex flex-col gap-8">
									<p>
										Вы можете получить доступ к специальной стоимости товаров, для этого необходимо
										подтвердить статус "Мастера", прикрепив сертификаты квалификации
									</p>
									<div class="flex flex-col gap-2">
										<div
											class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
										>
											<label for="certificate" class="text-sm">Сертификаты</label>
											<div
												class="basic-input relative w-fit max-md:w-full"
												class:border-error={formState?.errors?.certificatesType ||
													formState?.errors?.certificatesSize}
											>
												<p class="pointer-events-none">
													{certificates
														? Array.from(certificates)
																.map((file) => file.name)
																.join(', ')
														: 'Приложить сертификаты'}
												</p>
												<input
													class=" absolute left-0 top-0 h-full w-full opacity-0"
													name="certificates"
													type="file"
													placeholder="example@mail.ru"
													multiple
													bind:files={certificates}
													oninput={() => {
														if (formState?.errors?.certificatesType) {
															formState.errors.certificatesType = '';
														} else if (formState?.errors?.certificatesSize) {
															formState.errors.certificatesSize = '';
														}
													}}
												/>
											</div>
										</div>
										{#if formState?.errors?.certificatesSize}
											<div
												class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
											>
												<p></p>
												<p class="px-2 text-xs text-error">{formState.errors.certificatesSize}</p>
											</div>
										{:else if formState?.errors?.certificatesType}
											<div
												class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
											>
												<p></p>
												<p class="px-2 text-xs text-error">{formState.errors.certificatesType}</p>
											</div>
										{/if}
									</div>
								</div>
								<form
									enctype="multipart/form-data"
									method="POST"
									use:enhance={(e) => {
										return async ({ update, result }) => {
											await update();

											if (result.type !== 'success') {
												toastState.add('Что-то пошло не так');
											} else {
												toastState.add('Информация обновлена');
											}
										};
									}}
									action="?/certificates"
								>
									<input class="hidden" type="file" name="files" files={certificates} />

									<button class="btn ml-auto max-md:w-full" type="submit">Сохранить</button>
								</form>
							{:else if data?.user.masterStatus === 'Ожидает проверки'}
								<div class="flex flex-col gap-8">
									<p>
										Сертификаты отправлены, администратор проверит их и предоставит доступ к
										специалным ценам. Статус проверки можно отследить ниже:
									</p>
									<p class="font-serif text-2xl">Статус: {data?.user.masterStatus}</p>
								</div>
							{:else if data?.user.masterStatus === 'Проверен'}
								<div class="flex flex-col gap-8">
									<p>
										Сертификаты успешно прошли проверку! <br /> Теперь у вас есть доступ к специальным
										ценам на сайте
									</p>
									<a href="/catalog" class="btn ml-auto">Посмотреть каталог</a>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
