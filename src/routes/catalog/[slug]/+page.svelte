<script>
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/core';
	import SheetContent from '$lib/components/ui/SheetContent.svelte';
	import CatalogRow from '$lib/components/global/CatalogRow.svelte';
	import RegistrationCta from '../../../lib/components/ui/RegistrationCta.svelte';

	let currentActive = $state(0);
	let tabsSlider;
	let tabs;
	let tabsElements;
	let tabsSliderElements;

	function goBack() {
		window.history.back();
	}
	function changeTabs(e) {
		console.log(e.target);
		for (let i = 0; i < tabsSliderElements.length; i++) {
			if (e.target === tabsSliderElements[i]) {
				tabsSliderElements.forEach((tab) => {
					tab.classList.remove('text-accent');
					tab.classList.add('border-transparent');
					tab.classList.add('text-textDuller');
					tab.classList.remove('border-accent');
				});
				tabsElements.forEach((tab) => {
					tab.classList.add('hidden');
					tab.classList.remove('flex');
				});
				e.target.classList.add('text-accent');
				e.target.classList.remove('text-textDuller');
				e.target.classList.add('border-accent');
				e.target.classList.remove('border-transparent');
				tabsElements[i].classList.add('flex');
				tabsElements[i].classList.remove('hidden');
			}
		}
	}
	$effect(() => {
		tabsElements = tabs.querySelectorAll('div');
		tabsSliderElements = tabsSlider.querySelectorAll('button');
		tabsSliderElements[0].click();

		console.log({ tabsElements, tabsSliderElements });
	});

	let demoData = {
		title: 'S.O.S. крем для чувствительной кожи Ella Bache, 50 мл',
		SKU: 'VE23033',
		price: '5 258',
		thumbnail: '/product-image.png',
		description: `
        <p>Крем «скорой помощи» для кожи, которая реагирует на любые, даже самые обычные воздействия, например, на воду при умывании, на средства очищения и т.п.</p>
		<p>После 1 месяца использования препарата к коже возвращается нормальная чувствительность, проходит раздражение, усиливается естественная защита. Вы можете вернуться к использованию любых косметических препаратов. Дипептидный комплекс в течение считанных секунд снимает чувство дискомфорта, жжение и зуд. Растительные экстракты снимают покраснение и успокаивают кожу. Омега 3-6-9 восстанавливают защитный барьер, пробиотики восстанавливают нормальную флору кожи. Через месяц ежедневного применения крема для чувствительной кожи возвращает нормальную чувствительность.</p>
		`,
		shortDesc: `Крем в течение считанных секунд убирает жжение и зуд, снимает покраснение и успокаивают кожу.`,
		ingridients: `Probioskin - – комплекс пре- и пробиотиков, D-Sensine – дипептидный комплекс для нормальной чувствительности кожи, экстракты коричневого льна, листьев цеструма, гамамелиса, масла косточек малины, пророщенной пшеницы, ореха ши, глицерин.`,
		usage:
			'Ежедневно утром и вечером равномерно нанести небольшое количество крема на тщательно очищенную кожу лица, шеи и декольте.',
		weight: '50 мл'
	};
	let deliveryContent = {
		title: 'Доставка и оплата',
		content: `<p>Самовывоз по адресу г. Москва, 2-я Фрунзенская 10/1</p>
<p>
Доставка собственной курьерской службой по г. Москва (в пределах МКАД!) "до двери"- 400 р., при заказе от 3 000 р. - бесплатно. Оплата наличными.
</p>
<p>
Доставка по г. Москва и России осуществляется транспортной компанией СДЭК до пункта ПВЗ (ПВЗ согласовывается при оформлении заказа). 
</p>
`
	};
	let profiContent = {
		title: 'Мастерам и косметологам',
		content: `<p>Самовывоз по адресу г. Москва, 2-я Фрунзенская 10/1</p>
<p>
Доставка собственной курьерской службой по г. Москва (в пределах МКАД!) "до двери"- 400 р., при заказе от 3 000 р. - бесплатно. Оплата наличными.
</p>
<p>
Доставка по г. Москва и России осуществляется транспортной компанией СДЭК до пункта ПВЗ (ПВЗ согласовывается при оформлении заказа). 
</p>
`
	};
	let contactContent = {
		title: 'Связаться с нами',
		content: `<p>Самовывоз по адресу г. Москва, 2-я Фрунзенская 10/1</p>
<p>
Доставка собственной курьерской службой по г. Москва (в пределах МКАД!) "до двери"- 400 р., при заказе от 3 000 р. - бесплатно. Оплата наличными.
</p>
<p>
Доставка по г. Москва и России осуществляется транспортной компанией СДЭК до пункта ПВЗ (ПВЗ согласовывается при оформлении заказа). 
</p>
`
	};
	const sales = {
		title: 'Вместе берут',
		href: '#'
	};
</script>

<section>
	<div class="flex flex-col gap-6 px-5 pt-6 max-md:px-0 max-md:pt-0">
		<div class="max-lg:hidden">
			<Breadcrumbs />
		</div>
		<div class="grid grid-cols-[2fr_1fr] gap-16 max-lg:flex max-lg:flex-col max-lg:gap-8">
			<div class="flex h-fit items-center justify-center rounded bg-bgColor max-md:h-lvh">
				<div class="gradient absolute left-0 top-0 hidden h-16 w-full max-md:flex"></div>
				<button
					type="button"
					class="absolute left-5 top-7 z-20 hidden h-3 w-3 rotate-180 max-md:flex"
					onclick={goBack}
				>
					<img class="w-full" src="/arrow-navigate.svg" alt="arrow icon" />
				</button>
				<img class="w-2/3 object-contain max-md:w-full" src={demoData.thumbnail} alt="" />
			</div>
			<div class="flex flex-col gap-6 max-lg:items-center max-md:px-5 max-md:gap-4">
				<div class="flex flex-col gap-3 max-lg:items-center max-md:gap-2">
					<h1 class="font-serif text-3xl max-lg:w-2/3 max-lg:text-center max-md:w-full">{demoData.title}</h1>
					<p class="text-sm text-textDull max-lg:text-center">Артикул: {demoData.SKU}</p>
				</div>
				<h2 class="text-2xl">{demoData.price} руб</h2>
				<div
					class="flex w-full items-center gap-0 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:z-20 max-lg:bg-white max-lg:px-5 max-lg:py-3 max-md:bottom-[60px] "
				>
					<a href="#" class="btn w-full gap-1"
						><span class="text-white max-md:text-base">Добавить в корзину</span>
						<span class="hidden text-white max-lg:flex max-md:text-base"> - {demoData.price} руб</span></a
					>
					<a href="#" class="flex h-full w-14 items-center justify-center px-4">
						<img src="/favorite.svg" alt="" />
					</a>
				</div>
				<div class="flex flex-col mt-6  gap-6 max-md:mt-4">
					<div bind:this={tabsSlider}>
						<Splide
							aria-label="products"
							options={{
								autoWidth: true,
								perMove: 1,
								snap: true,
								drag: 'free',
								gap: '2rem',
								arrows: false,
								pagination: false,
								breakpoints: {
									1024: {
										perPage: 3
									},
									767: {
										perPage: 2,
										gap: '2rem'
									}
								}
							}}
						>
							{#if demoData.description}
								<SplideSlide>
									<button
										data-slider
										class="flex border-b pb-4 transition duration-300"
										type="button"
										onclick={changeTabs}>Описание</button
									>
								</SplideSlide>
							{/if}
							{#if demoData.usage}
								<SplideSlide>
									<button
										data-slider
										class="flex border-b pb-4 transition duration-300"
										type="button"
										onclick={changeTabs}>Применение</button
									>
								</SplideSlide>
							{/if}
							{#if demoData.ingridients}
								<SplideSlide>
									<button
										data-slider
										class="flex border-b pb-4 transition duration-300"
										type="button"
										onclick={changeTabs}>Состав</button
									>
								</SplideSlide>
							{/if}
							{#if demoData.brands}
								<SplideSlide>
									<button
										data-slider
										class="flex border-b pb-4 transition duration-300"
										type="button"
										onclick={changeTabs}>Информация о бренде</button
									>
								</SplideSlide>
							{/if}
						</Splide>
					</div>
					<div bind:this={tabs}>
						{#if demoData.description}
							<div class="hidden flex-col gap-3">
								{@html demoData.description}
							</div>
						{/if}
						{#if demoData.usage}
							<div class="hidden flex-col gap-3">
								{@html demoData.usage}
							</div>
						{/if}
						{#if demoData.ingridients}
							<div class="hidden flex-col gap-3">
								{@html demoData.ingridients}
							</div>
						{/if}
					</div>
				</div>
				<div class="w-full border-t border-borderColor pt-3">
					<SheetContent content={deliveryContent} />
					<SheetContent content={profiContent} />
					<SheetContent content={contactContent} />
				</div>
			</div>
		</div>
	</div>
	<div class="splide__list hidden"></div>
</section>

<CatalogRow content={sales} />
<RegistrationCta />
<CatalogRow content={sales} />

<style>
	:global(.splide__list:has(button[data-slider])) {
		border-bottom: 1px solid #ebe6e1;
	}
	.gradient {
		background: rgb(0, 0, 0);
		background: -moz-linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
		background: -webkit-linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#000000",GradientType=1);
	}
</style>
