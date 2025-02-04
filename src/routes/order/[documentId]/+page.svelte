<script>
	import { CMS_URL } from '$lib/globals.js';
	import Seo from '$lib/components/utils/SEO.svelte';

	let { data } = $props();

	$inspect(data);
</script>

<Seo title={`Заказ №${data?.order?.id}`} description={`Заказ №${data?.order?.id}`} />
<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>
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

<section>
	<div class="container">
		<div class="mx-auto flex w-3/5 flex-col gap-12 pt-12 max-xl:w-4/5 max-lg:w-full max-md:pt-8">
			<h1
				class="text-balance text-center font-serif text-3xl max-lg:text-2xl max-md:text-center max-md:text-2xl"
			>
				Заказ №{data.order?.id}
			</h1>
			<div class="flex flex-col gap-16">
				<div class="grid grid-cols-2 gap-x-12 gap-y-8 max-md:flex max-md:flex-col max-md:gap-6">
					{#each data.order?.products as product}
						{@render miniCard(product.product, product.quantity)}
					{/each}
				</div>
				<div class="flex flex-col gap-12">
					<h3 class="font-serif text-2xl">Данные заказа</h3>
					<div class="grid grid-cols-[2fr_1fr] gap-4 max-md:flex max-md:flex-col max-md:gap-12">
						<div class="flex flex-col gap-8">
							<div
								class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
							>
								<label for="email" class="text-sm">Email</label>
								<input
									class="basic-input max-md:w-full"
									name="email"
									type="email"
									disabled
									value={data.order?.email}
									placeholder="example@mail.ru"
								/>
							</div>
							<div
								class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
							>
								<label for="name" class="text-sm">Имя</label>
								<input
									disabled
									class="basic-input max-md:w-full"
									name="name"
									type="text"
									value={data.order?.firstName}
									placeholder="Иван"
								/>
							</div>
							<div
								class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
							>
								<label for="surname" class="text-sm">Фамилия</label>
								<input
									disabled
									class="basic-input max-md:w-full"
									name="surname"
									type="text"
									placeholder="Иванов"
									value={data.order?.secondName}
								/>
							</div>
							<div
								class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
							>
								<label for="phone" class="text-sm">Телефон</label>
								<input
									disabled
									class="basic-input max-md:w-full"
									name="phone"
									type="text"
									placeholder="+79923231351"
									value={data.order?.phone}
								/>
							</div>
							<div
								class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:w-full max-md:flex-col max-md:items-start max-md:justify-start"
							>
								<label for="address" class="text-sm">Адрес</label>
								<input
									disabled
									class="basic-input max-md:w-full"
									name="address"
									type="text"
									placeholder="Москва, ул. Дубнинская, д. 43"
									value={data.order?.address}
								/>
							</div>
						</div>
						<div class="-mt-3 ml-10 flex flex-col gap-10 max-lg:ml-2 max-md:m-0">
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
									<li
										class="group w-full rounded transition duration-300 hover:bg-bgColor max-md:hover:bg-white"
									>
										<a class="flex items-center justify-between px-2 py-3 max-md:px-0" href="#">
											<span>Условия доставки</span>
											<img src="/arrow-header.svg" alt="arrow icon" />
										</a>
									</li>
									<li
										class="group w-full rounded transition duration-300 hover:bg-bgColor max-md:hover:bg-white"
									>
										<a class="flex items-center justify-between px-2 py-3 max-md:px-0" href="#">
											<span>Условия обмена и возврата</span>
											<img src="/arrow-header.svg" alt="arrow icon" />
										</a>
									</li>
									<li
										class="group w-full rounded transition duration-300 hover:bg-bgColor max-md:hover:bg-white"
									>
										<a class="flex items-center justify-between px-2 py-3 max-md:px-0" href="#">
											<span>Информация об оплате</span>
											<img src="/arrow-header.svg" alt="arrow icon" />
										</a>
									</li>
								</ul>
							</nav>
							<div class="mt-auto flex flex-col gap-6 max-md:gap-4">
								<p class="flex items-end justify-between gap-4 max-md:justify-center">
									<span class="text-lg max-md:text-base">Скидка:</span>
									<span class="text-sm max-md:text-base">{data.order?.discount} руб</span>
								</p>
								<p class="flex items-end justify-between gap-4 max-md:justify-center">
									<span class="text-lg max-md:text-base">Итого:</span>
									<span class="text-2xl max-md:text-base">{data.order?.total} руб</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				<a href="/" class="btn mx-auto">Продолжить покупки</a>
			</div>
		</div>
	</div>
</section>
