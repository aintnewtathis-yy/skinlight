<script>
	import { popupState } from '$lib/globals.svelte.js';

	let { footerNavigation, formState } = $props();
</script>

{#if footerNavigation}
	<footer class="max-lg:hidden">
		<div class="container">
			<div class="flex flex-col gap-24 border-t border-borderColor py-16 pb-5">
				<div class="grid grid-cols-4 gap-16 max-xl:gap-10">
					{#each footerNavigation.footerColumn as column}
						<div class="flex flex-col gap-6">
							<h6 class="text-xl">{column.label}</h6>
							{#each column.link as link}
								<a class="hover:text-accentHover focus:text-accentHover" href={link.href}>
									{link.label}
								</a>
							{/each}
						</div>
					{/each}
					<div class="flex flex-col justify-between">
						<div class="flex flex-col gap-6">
							<p class="text-lg">{footerNavigation.footerSocials.text}</p>
							<button type="button" class="btn-dull w-full" onclick={() => {$popupState = !$popupState;}}>Подписаться</button>
						</div>
						<div class="flex gap-6">
							{#each footerNavigation.footerSocials.link as link}
								<a class="hover:text-accentHover focus:text-accentHover" href={link.href}>
									{link.label}
								</a>
							{/each}
						</div>
					</div>
				</div>
				<div class="flex justify-end border-t border-borderColor py-6">
					<p>SKIN LIGHT GROUP, 2024</p>
				</div>
			</div>
		</div>
	</footer>
{/if}
