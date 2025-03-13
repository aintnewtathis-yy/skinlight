<script>
	import { enhance } from '$app/forms';
	import { getToastState } from '$lib/globals.svelte';
	import { fade } from 'svelte/transition';
	import { popupState } from '$lib/globals.svelte.js';

	let { action, formState } = $props();

	let toastState = getToastState();
	let formSent = $state(false);
	let email = $state('');

	function openSheet() {
		$popupState = !$popupState;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="fixed inset-0 left-0 top-0 z-50 h-dvh w-screen bg-black/30 backdrop-blur-sm transition duration-300"
	class:pointer-events-all={$popupState}
	class:opacity-0={!$popupState}
	class:pointer-events-none={!$popupState}
	onclick={() => {
		$popupState = false;
	}}
></div>

{#if $popupState}
	<div
		transition:fade={{ duration: 300 }}
		class="fixed left-1/2 top-1/2 z-50 flex h-fit w-[calc(100%-20px)] max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-12 py-6 shadow-lg transition duration-300 max-lg:w-3/5 max-sm:bottom-[10px] max-sm:top-auto max-sm:w-[calc(100%-20px)] max-sm:translate-y-0 max-sm:p-5"
	>
		<div class="flex w-full flex-col gap-7">
			{#if !formSent}
				<p class="text-xl max-md:w-11/12">Подписка на новостную рассылку</p>
				<form
					action="cart?/massemail"
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
					class="flex flex-col"
				>
					<div class="flex flex-col">
						<label for="email" class="sr-only">Имя</label>
						<input
							class="basic-input max-md:w-full"
							name="email"
							type="email"
							placeholder="Email*"
							bind:value={email}
							oninput={() => {
								if (formState?.errors?.email) {
									formState.errors.email = '';
								}
							}}
							class:border-error={formState?.errors?.email}
						/>
						{#if formState?.errors?.email}
							<p class="text-sm text-error">
								{formState?.errors?.email}
							</p>
						{/if}
					</div>
					<button class="btn mt-7 w-full" type="submit">Подписаться</button>
					<p class="mt-2 text-balance text-center text-xs">
						Подписываясь на рассылку, вы соглашаетесь с условиями <a class="text-[#C6A07D]"
							>Политики конфиденциальности</a
						>
					</p>
				</form>
			{:else}
				<p class="text-3xl max-md:w-11/12">Заявка отправлена</p>
				<p>Благодарим за вашу заявку! <br /> Менеджер свяжется с вами в ближайшее время</p>
			{/if}
		</div>
		<button type="button" class="fixed right-4 top-4 h-5 w-5 p-1" onclick={openSheet}>
			<img class="w-full object-contain" src="/cross.svg" alt="cross icon" />
		</button>
	</div>
{/if}
