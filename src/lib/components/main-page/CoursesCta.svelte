<script>
    let paragraph;
	let bulletContent = [
		{
			number: '5000+',
			text: 'Учеников',
			textAdditional: 'обучили современным технологиям'
		},
		{
			number: '17',
			text: 'Лет обучаем лучших ',
			textAdditional: 'косметологов и мастеров шугаринга'
		},
		{
			number: '90%',
			text: 'Мастеров',
			textAdditional: 'прошли больше одного обучения'
		},
		{
			number: '400+',
			text: 'Часов материала',
			textAdditional: 'записано лучшими специалистами сферы'
		}
	];
</script>

{#snippet bullet(content)}
	<div class="flex flex-col gap-2">
		<span class="font-serif text-7xl max-md:text-5xl"> {content.number} </span>
		<p class="text-lg max-md:text-sm">{content.text}</p>
		<p class="text-Duller text-balance text-sm max-md:text-xs">{content.textAdditional}</p>
	</div>
{/snippet}

<section>
	<div class="container">
		<div class="flex flex-col gap-12">
			<div class="grid grid-cols-2 max-md:flex max-md:flex-col gap-8 ">
				<div class="flex w-4/5 flex-col gap-6 max-lg:w-full  max-md:pr-0 max-md:gap-4">
					<h5 class="font-serif text-5xl max-xl:text-4xl max-md:text-3xl">Измените свою жизнь</h5>
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<p class="flex flex-col gap-3 text-balance max-h-full overflow-hidden max-md:gap-2 max-lg:text-sm max-md:max-h-20"
                    bind:this={paragraph}
                    onclick={() => {
                        paragraph.classList.toggle('max-md:max-h-20')
						paragraph.querySelector('.gradient').classList.toggle('max-md:flex')
                    }}
                    >
						<span class="text-textLessDull">
							Получите одну из самых востребованных и хорошо оплачиваемых профессий в
							бьюти-индустрии.
						</span>
						<span class="text-textLessDull">
							Обучаясь у нас, вы получите возможность работать на самых высококлассных косметических
							брендах, сможете получать квалифицированную помощь и консультации.
						</span>
						<span class="text-textLessDull">
							Учебный центр Группы компаний "Скин Лайт" обучает косметологов и мастеров шугаринга
							более 17 лет, являясь одной из самых популярных школ по депиляции и массажу среди
							специалистов.
						</span>
						<span class="gradient absolute bottom-0 left-0 hidden h-6 w-full max-md:flex"></span>
					</p>
					<a href="#" class="btn-dull mt-3 max-md:mt-0">Записаться на обучение</a>
				</div>
				<div>
					<img class="rounded" src="/coursescta.png" alt="" />
				</div>
			</div>
			<div class="grid grid-cols-4 gap-4 max-lg:grid-cols-2">
				{#each bulletContent as element}
					{@render bullet(element)}
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.gradient {
		background: rgb(0, 0, 0);
		background: -moz-linear-gradient(180deg, transparent 49%, rgba(255, 255, 255, 1) 100%);
		background: -webkit-linear-gradient(180deg, transparent 49%, rgba(255, 255, 255, 1) 100%);
		background: linear-gradient(180deg, transparent 49%, rgba(255, 255, 255, 1) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#ffffff",GradientType=1);
	}
</style>
