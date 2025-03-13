<script>
	import Seo from '$lib/components/utils/SEO.svelte';
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let formState = $state(form ?? null);
	let passwordConfirm = $state(formState?.data.passwordConfirm ?? '');
	let password = $state(formState?.data.password ?? '');
	let formFilled = $derived.by(() => {
		return Boolean(passwordConfirm && password);
	});

	$effect(() => {
		formState = form;
	});
</script>

<Seo
	title={'Подтверждение смены пароля'}
	description={'Подтверждение смены пароля'}
/>

<section>
	<div class="container">
		<div class="mt-48 flex flex-col items-center justify-center gap-6 max-md:mt-24">
			<h1 class="font-serif text-2xl">Сменить пароль</h1>
			<form
				action="?/newPassword"
				use:enhance
				method="POST"
				class="flex w-full max-w-[350px] flex-col gap-3"
			>
				<div class="flex flex-col gap-2">
					<label class="sr-only" for="password"> Password </label>
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
				<div class="flex flex-col gap-2">
					<label class="sr-only" for="passwordConfirm"> Подтвердите пароль </label>
					<input
						class="basic-input w-full"
						name="passwordConfirm"
						type="password"
						placeholder="Подтвердите пароль"
						bind:value={passwordConfirm}
						class:border-error={formState?.errors?.passwordConfirm}
						oninput={() => {
							if (formState?.errors?.passwordConfirm) {
								formState.errors.passwordConfirm = '';
							}
						}}
					/>
					{#if formState?.errors?.passwordConfirm}
						<p class="px-2 text-xs text-error">{formState.errors.passwordConfirm[0]}</p>
					{/if}
				</div>
				<input type="hidden" class="hidden" name="code" value={data?.resetCode}>
				<button class="btn w-full" disabled={!formFilled} type="submit">Зарегестрироваться</button>
			</form>
			<p>Уже есть аккаунт? <a class="btn-text" href="/login">Войти</a></p>
		</div>
	</div>
</section>
