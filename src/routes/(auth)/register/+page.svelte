<script>
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let formState = $state(form ?? null);
    let email = $state(formState?.data.email ?? '')
    let password = $state(formState?.data.password ?? '')
    let formFilled = $derived.by(() => {
        return Boolean(email && password)
    })

	$effect(() => {
		formState = form;
	});

</script>

<section>
	<div class="container">
		<div class="mt-48 flex flex-col items-center justify-center gap-6 max-md:mt-24">
			<h1 class="font-serif text-2xl">Регистрация</h1>
			<form
				action="?/register"
				use:enhance
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
				<button class="btn w-full" disabled={!formFilled} type="submit">Зарегестрироваться</button>
			</form>
			<p>Уже есть аккаунт? <a class="btn-text" href="/login">Войти</a></p>
		</div>
	</div>
</section>
