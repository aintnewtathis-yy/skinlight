<script>
	import { getToastState } from '$lib/globals.svelte';
	import { fade, fly } from 'svelte/transition';

	const toastState = getToastState();
</script>

{#each toastState.toasts as toast, i}
	<div
        in:fly={{y:-100, duration: 300}}
        out:fly={{y:-30, duration: 300}}
		class="fixed left-0 top-0 z-50 flex w-full items-center justify-center bg-bgColor p-3 transition duration-300"
	>
		<p class="text-center text-base">{toast.message}</p>
	</div>
{/each}
