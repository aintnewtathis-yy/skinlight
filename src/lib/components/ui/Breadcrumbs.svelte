<script>
	let { links } = $props();

    let demoLinks = [
        {
            label: 'Главная',
            href: '#'
        },
        {
            label: 'Бренды',
            href: '#'
        },
        {
            label: 'Ella Bache',
            href: '#'
        },
    ]
</script>

<div class="flex gap-2 items-end *:text-textDull">
    {#each demoLinks as link, i}
        {#if i < demoLinks.length - 1 }
            <a href={link.href}>{link.label}</a>
            <span>/</span>
        {:else}
            <span>{link.label}</span>
        {/if}
    {/each}
</div>
