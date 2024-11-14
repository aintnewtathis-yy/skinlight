<script>
	import Seo from '$lib/components/utils/SEO.svelte';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	let { data, form } = $props();

	let formState = $state(form ?? null);
	let identifier = $state(formState?.data.identifier ?? '');
	let password = $state(formState?.data.password ?? '');
	let formFilled = $derived.by(() => {
		return Boolean(identifier && password);
	});

	$effect(() => {
		formState = form;
	});

	onMount(async () => {
		await invalidateAll();
	});
</script>

<Seo
	title={'Вход в профиль'}
	description={'Вход в профиль'}
/>

<section>
	<div class="container">
		<div class="mt-48 flex flex-col items-center justify-center gap-6 max-md:mt-24">
			<h1 class="font-serif text-2xl">Вход</h1>
			<form
				action="?/login"
				use:enhance
				method="POST"
				class="flex w-full max-w-[350px] flex-col gap-3"
			>
				<div class="flex flex-col gap-2">
					<label class="sr-only" for="identifier"> Email </label>
					<input
						class="basic-input w-full"
						name="identifier"
						type="email"
						placeholder="Email"
						bind:value={identifier}
						class:border-error={formState?.errors?.identifier}
						oninput={() => {
							if (formState?.errors?.identifier) {
								formState.errors.identifier = '';
							}
						}}
					/>
					{#if formState?.errors?.identifier}
						<p class="px-2 text-xs text-error">{formState.errors.identifier[0]}</p>
					{/if}
				</div>
				<div class="flex flex-col gap-2">
					<label class="sr-only" for="password"> Пароль </label>
					<input
						class="basic-input w-full"
						name="password"
						type="password"
						placeholder="Пароль"
						bind:value={password}
						class:border-error={formState?.errors?.password}
						oninput={() => {
							if (formState?.errors?.password) {
								formState.errors.password = '';
							}
						}}
					/>
					{#if formState?.errors?.password}
						<p class="px-2 text-xs text-error">{formState.errors.password[0]}</p>
					{/if}
				</div>
				{#if formState?.loginError}
					<p class="text-error">{formState.loginError}</p>
				{/if}
				<button class="btn w-full" disabled={!formFilled} type="submit">Войти</button>
			</form>

			<p>
				<a class="btn-text" href="/register">Зарегестрироваться</a> или
				<a class="btn-text" href="/change-password">Восстановить пароль</a>
			</p>
		</div>
	</div>
</section>
