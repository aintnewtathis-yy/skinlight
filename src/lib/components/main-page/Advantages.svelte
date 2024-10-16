<script>
	let advantagesContent = [
		{
			title: 'Индвидуальный прайс-лист',
			text: 'Получите эксклюзивные цены и скидки для мастеров сразу после регистрации на сайте.'
		},
		{
			title: 'Скидки на оптовые заказы ',
			text: 'Получите одну из самых востребованных и хорошо оплачиваемых профессий в бьюти-индустрии.'
		},
		{
			title: 'Обучение и онлан-курсы',
			text: 'Предлагаем обучение с нуля и повышение квалификации для мастеров, включая удобные онлайн-курсы.  '
		},
		{
			title: 'Сертификаты на продукцию',
			text: 'Вся косметика сертифицирована и соответствует высоким стандартам качества.'
		}
	];
</script>

{#snippet advantage(content)}
	<div
		class="flex flex-col gap-6 rounded bg-bgColor p-6 border border-borderColor max-lg:w-2/5 max-lg:flex-shrink-0 max-lg:flex-grow-0 max-md:w-11/12 max-md:gap-3 "
	>
		<h2 class="font-serif text-2xl max-lg:text-xl">{content.title}</h2>
		<p class="mt-auto text-textDull max-lg:text-sm ">{content.text}</p>
	</div>
{/snippet}

<section>
	<div
		class="no-scrollbar grid grid-cols-4 gap-4 px-5 max-lg:flex max-lg:overflow-x-auto max-md:gap-2"
	>
		{#each advantagesContent as advantageEl}
			{@render advantage(advantageEl)}
		{/each}
	</div>
</section>
