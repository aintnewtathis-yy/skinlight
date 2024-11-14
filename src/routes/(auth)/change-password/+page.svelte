<script>
	import Seo from '$lib/components/utils/SEO.svelte';
	import { enhance } from '$app/forms';
	import { getToastState } from '$lib/globals.svelte';

	let { data, form } = $props();

	let toastState = getToastState();
	let formState = $state(form ?? null);
    let email = $state(formState?.data.email ?? '')
    let password = $state(formState?.data.password ?? '')
    let formFilled = $derived.by(() => {
        return Boolean(email)
    })

	$effect(() => {
		formState = form;
	});

</script>

<Seo
	title={'Сменить пароль'}
	description={'Сменить пароль'}
/>

<section>
	<div class="container">
		<div class="mt-48 flex flex-col items-center justify-center gap-6 max-md:mt-24">
			<h1 class="font-serif text-2xl">Сменить пароль</h1>
			<form
				action="?/changePassword"
				use:enhance={(e) => {
					return async ({ update, result }) => {
						await update();

						if (result.status === 204) {
							toastState.add('Отправили ссылку для смены пароля на почту');
						} else if (result.status === 400) {
							toastState.add('Что-то пошло не так');
						}
					};
				}}
				method="POST"
				class="flex w-full max-w-[350px] flex-col gap-3"
			>
				<div class="flex flex-col gap-2">
					<label class="sr-only" for="email"> Email </label>
					<input
						class="basic-input w-full"
						name="email"
						type="email"
						placeholder="Email"
						bind:value={email}
						class:border-error={formState?.errors?.email}
						oninput={() => {
							if (formState?.errors?.email) {
								formState.errors.email = '';
							}
						}}
					/>
					{#if formState?.errors?.email}
						<p class="px-2 text-xs text-error">{formState.errors.email[0]}</p>
					{/if}
				</div>
				
				<button class="btn w-full" disabled={!formFilled} type="submit">Сменить пароль</button>
			</form>
			<p>Еще нет аккаунта? <a class="btn-text" href="/register">Регистрация</a></p>
		</div>
	</div>
</section>
