<script>
	import { page } from '$app/stores';
</script>

<div class="flex h-[60vh] items-center justify-center max-md:h-svh px-5">
	<h1
		class="text-balance text-center font-serif text-4xl max-lg:text-3xl max-md:text-4xl "
	>
		{$page.status}: {$page.error.message}
	</h1>
</div>
