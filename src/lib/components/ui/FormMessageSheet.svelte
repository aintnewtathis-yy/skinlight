<script>
	import { enhance } from '$app/forms';
	import { getToastState } from '$lib/globals.svelte';

	let { content, action, formState, data, index } = $props();

	let toastState = getToastState();
	let formSent = $state(false);
	let message = $state();
	let open = $state(false);
	let name = $state(data?.user?.firstName ?? '');
	let phone = $state(data?.user?.phone ?? '');

	function openSheet() {
		open = !open;
	}
</script>

<button
	class="-ml-2 flex w-[calc(100%_+_16px)] items-center justify-between rounded px-2 py-3 transition duration-300 hover:bg-bgColor max-md:hover:bg-white"
	onclick={openSheet}
	class:border-t={index === 0}
>
	<p class=" text-start">{content.title}</p>
	<img src="/arrow-header.svg" alt="filter icon" />
</button>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="fixed inset-0 left-0 top-0 z-50 h-dvh w-screen bg-black/30 backdrop-blur-sm transition duration-300"
	class:pointer-events-all={open}
	class:opacity-0={!open}
	class:pointer-events-none={!open}
	onclick={() => {
		open = false;
	}}
></div>

<div
	class="fixed inset-y-0 right-0 top-0 z-50 flex h-dvh w-2/5 bg-white p-5 shadow-lg transition duration-300 max-lg:w-3/5 max-sm:w-full"
	class:translate-x-[110%]={!open}
	class:translate-x-0={open}
>
	<div class="flex w-full flex-col gap-10">
		{#if !formSent}
			<p class="text-3xl max-md:w-11/12">{content.title}</p>
			<form
				{action}
				method="POST"
				use:enhance={(e) => {
					return async ({ update, result }) => {
						await update();

						if (result.type === 'success') {
							formSent = true;
						} else {
							toastState.add('Что-то пошло не так');
						}
					};
				}}
				class="flex flex-col gap-3"
			>
				<div class="flex flex-col gap-2">
					<label for="name" class="sr-only">Имя</label>
					<input
						class="basic-input max-md:w-full"
						name="name"
						type="text"
						placeholder="Имя*"
						bind:value={name}
						oninput={() => {
							if (formState?.errors?.name) {
								formState.errors.name = '';
							}
						}}
						class:border-error={formState?.errors?.name}
					/>
					{#if formState?.errors?.name}
						<p class="text-sm text-error">
							{formState?.errors?.name}
						</p>
					{/if}
				</div>
				<div class="flex flex-col gap-2">
					<label for="phone" class="sr-only">Телефон</label>
					<input
						class="basic-input max-md:w-full"
						name="phone"
						type="text"
						placeholder="Телефон*"
						bind:value={phone}
						oninput={() => {
							if (formState?.errors?.phone) {
								formState.errors.phone = '';
							}
						}}
						class:border-error={formState?.errors?.phone}
					/>
					{#if formState?.errors?.phone}
						<p class="text-sm text-error">
							{formState?.errors?.phone}
						</p>
					{/if}
				</div>
				<div class="flex flex-col gap-2">
					<label for="message" class="sr-only">Сообщение</label>
					<textarea
						class="basic-input max-md:w-full min-h-40"
						name="message"
						placeholder="Сообщение*"
						bind:value={message}
					>
                    </textarea>
				</div>
				<button class="btn mt-5 w-full" type="submit">Оставить заявку</button>
			</form>
		{:else}
			<p class="text-3xl max-md:w-11/12">Заявка отправлена</p>
			<p>Благодарим за вашу заявку! <br /> Менеджер свяжется с вами в ближайшее время</p>
		{/if}
		<button
			type="button"
			class="fixed right-5 top-5 h-6 w-6 p-1"
			onclick={() => {
				open = false;
			}}
		>
			<img class="w-full object-contain" src="/cross.svg" alt="cross icon" />
		</button>
	</div>
</div>
