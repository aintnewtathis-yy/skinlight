<script>
	import { enhance } from '$app/forms';
	import { getToastState, getCartState } from '$lib/globals.svelte';

	let toastState = getToastState();
	let cartState = getCartState();

	let { formState } = $props();
	let open = $state(false);
	let inputState = $state(cartState.promocode?.promocode ?? '');
	let promocodeEntered = $derived(cartState.promocode);
</script>

<div class="overflow-hidden">
	<button
		class="flex items-center gap-2"
		type="button"
		onclick={() => {
			open = !open;
		}}
	>
		<span>Ввести промокод</span>
		<img src="/arrow-filter.svg" alt="arrow icon" />
	</button>
	<div
		class="overflow-hidden transition-all duration-300"
		class:max-h-24={open}
		class:max-h-0={!open}
		class:pt-2={open}
		class:pt-0={!open}
	>
		<form
			action="?/getDiscount"
			method="POST"
			use:enhance={(e) => {
				cartState.promocode = null;

				return async ({ update, result }) => {
					await update();

					if (result.type === 'success') {
						toastState.add('Промокод успешно добавлен');
						cartState.addPromocode(result.data.promocode);
						inputState = promocodeEntered.promocode;
					}
				};
			}}
			class="grid w-3/4 grid-cols-[2fr_1fr] items-center justify-start gap-2"
		>
			<div class="relative flex flex-col gap-2">
				<input
					type="text"
					placeholder="PROMOCODE"
					class="basic-input"
					name="promocodeName"
					bind:value={inputState}
					oninput={() => {
						if (formState?.errors?.promocodeName) {
							formState.errors.promocodeName = '';
						}
						if (formState?.notFound) {
							formState.notFound = false;
						}
					}}
					class:border-error={formState?.errors?.promocodeName}
					disabled={promocodeEntered}
				/>
				{#if promocodeEntered}
					<button
						onclick={() => {
							cartState.promocode = null;
							inputState = '';
						}}
						type="button"
						class="absolute right-3 top-1/2 aspect-square h-5 w-5 -translate-y-1/2"
					>
						<img src="/cross.svg" alt="cross icon" />
					</button>
				{/if}
			</div>
			<button type="submit" class="btn-dull" disabled={promocodeEntered}>Применить</button>
			{#if formState?.errors?.promocodeName}
				<p class="px-2 text-xs text-error">{formState.errors.promocodeName[0]}</p>
			{/if}
			{#if formState?.notFound}
				<p class="px-2 text-xs text-error">Промокод не найден</p>
			{/if}
		</form>
	</div>
</div>
