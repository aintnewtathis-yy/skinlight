<script>
	import Promocode from '../../lib/components/ui/Promocode.svelte';
    let open = $state(false);

	let demoProducts = [
		{
			title: 'Увлажняющий крем-плампер Ella Bache, 50 мл',
			SKU: 'VE23033',
			quantity: 1,
			price: 5258,
			thumbnail: '/cartProduct.png'
		},
		{
			title: 'Увлажняющий крем-плампер Ella Bache, 50 мл',
			SKU: 'VE23033',
			quantity: 1,
			price: 5258,
			thumbnail: '/cartProduct.png'
		}
	];
</script>

{#snippet cartElement(content)}
	<div class="grid grid-cols-[1fr_3fr_1.5fr] gap-6 max-md:grid-cols-[2fr_2fr_1fr] max-md:gap-4">
		<div class=" flex items-center justify-center border border-borderColor bg-bgColor px-3">
			<img
				class="my-auto aspect-square w-full rounded object-contain"
				src={content.thumbnail}
				alt=""
			/>
		</div>
		<div
			class="grid grid-cols-[2fr_1fr] gap-6 max-md:flex max-md:flex-col max-md:justify-between max-md:gap-4"
		>
			<div class="flex flex-col gap-3">
				<p class="font-serif max-md:text-sm">{content.title}</p>
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
						class="absolute left-4 top-1/2 h-3 w-3 -translate-y-1/2"
						type="button"
						onclick={() => {
							++content.quantity;
						}}
					>
						<img src="/plus.svg" alt="plus icon" />
					</button>
					<button
						class="absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2"
						type="button"
						onclick={() => {
							--content.quantity;
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
			<p class="py-3 text-center max-md:py-0 max-md:text-end max-md:text-sm">
				{content.price * content.quantity} руб
			</p>
			<div class="flex items-start py-3 max-lg:justify-end">
				<button type="button">
					<img src="/trash.svg" alt="bin icon" />
				</button>
			</div>
		</div>
	</div>
{/snippet}
<section>
	<div class="container">
		<div class="mx-auto flex w-3/5 flex-col gap-12 pt-12 max-xl:w-4/5 max-lg:w-full max-md:pt-8">
			<div class="">
				<div class="flex flex-col gap-12 max-md:gap-8">
					{#each demoProducts as content}
						{@render cartElement(content)}
					{/each}
				</div>
			</div>
			<div
				class="grid grid-cols-[2fr_1fr] gap-4 transition duration-300 border-t max-lg:grid-cols-[3fr_2fr] border-borderColor pt-12 max-md:fixed max-md:bottom-[60px] max-md:flex max-md:h-[calc(100vh-60px)] max-md:z-20 overflow-y-auto max-md:left-0 max-md:p-5 max-md:bg-white max-md:flex-col max-md:gap-10"
                class:max-md:-translate-x-full={!open}
                class:max-md:translate-x-0={open}
                >
				<div class="flex flex-col gap-10">
					<div class="flex justify-between items-start">
                        <Promocode />
                        <button type="button"
                        class="text-sm"
                        onclick={() => {
                            open = false
                        }}
                        > 
                            <img src="/cross.svg" alt="">
                        </button>
                    </div>
					<div class="flex flex-col gap-8">
						<div class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:flex-col max-md:items-start max-md:w-full max-md:justify-start">
							<label for="email" class="text-sm">Email</label>
							<input class="basic-input max-md:w-full" name="email" type="email" placeholder="example@mail.ru" />
						</div>
						<div class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:flex-col max-md:items-start max-md:w-full max-md:justify-start">
							<label for="name" class="text-sm">Имя</label>
							<input class="basic-input max-md:w-full" name="name" type="text" placeholder="Иван" />
						</div>
						<div class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:flex-col max-md:items-start max-md:w-full max-md:justify-start">
							<label for="surname" class="text-sm">Фамилия</label>
							<input class="basic-input max-md:w-full" name="surname" type="text" placeholder="Иванов" />
						</div>
						<div class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:flex-col max-md:items-start max-md:w-full max-md:justify-start">
							<label for="phone" class="text-sm">Телефон</label>
							<input class="basic-input max-md:w-full" name="phone" type="text" placeholder="+79923231351" />
						</div>
						<div class="grid grid-cols-[1fr_3fr] items-center gap-4 max-md:flex max-md:flex-col max-md:items-start max-md:w-full max-md:justify-start">
							<label for="town" class="text-sm">Населенный пункт</label>
							<input class="basic-input max-md:w-full" name="town" type="text" placeholder="Москва" />
						</div>
					</div>
				</div>
				<div class="ml-10 flex flex-col gap-10 max-lg:ml-2 max-md:m-0">
					<nav class="max-md:hidden">
						<ul class="flex flex-col">
							<li
								class="group w-full rounded transition duration-300 hover:bg-bgColor max-md:hover:bg-white"
							>
								<a class="flex items-center justify-between px-2 py-3 max-md:px-0" href="#">
									<span>Войти в личный кабинет</span>
									<img src="/arrow-header.svg" alt="arrow icon" />
								</a>
							</li>
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
					<div class="flex flex-col gap-6 max-md:gap-4">
						<p class="flex items-end justify-between gap-4 max-md:justify-center ">
							<span class="text-lg max-md:text-base">Скидка:</span>
							<span class="text-sm max-md:text-base">0 руб</span>
						</p>
						<p class="flex items-end justify-between gap-4 max-md:justify-center">
							<span class="text-lg max-md:text-base">Итого:</span>
							<span class="text-2xl max-md:text-base">12333 руб</span>
						</p>
						<div class="mt-4 flex flex-col gap-4">
							<a href="#" class="btn w-full">Оплатить заказ</a>
							<p class="max-md:text-sm max-md:text-center">
								Нажимая на кнопку «оплатить заказ», я принимаю
								<a class="underline" href="#">условия публичной оферты</a>
								и <a class="underline" href="#">политики конфиденциальности</a>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="fixed left-0 bottom-[60px] bg-white hidden w-full px-5 py-2 max-md:flex">
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
	</div>
</section>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="fixed w-screen transition duration-300 z-10 h-screen top-0 left-0 bg-black/30 inset-0 backdrop-blur-sm"
    class:pointer-events-all={open}
    class:opacity-0={!open}
    class:pointer-events-none={!open}
    onclick={() => {
        open = false;
    }}
></div>
