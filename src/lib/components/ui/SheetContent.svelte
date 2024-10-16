<script>
	import { marked } from 'marked';

    let { content, index } = $props()
    let open = $state(false);

    function openFilters() {
        open = !open;
    }
</script>

<button class="w-[calc(100%_+_16px)] py-3 px-2 -ml-2 flex justify-between items-center  rounded hover:bg-bgColor max-md:hover:bg-white transition duration-300" onclick={openFilters} class:border-t={index === 0} >
        <p class=" text-start">{content.title}</p>
        <img src="/arrow-header.svg" alt="filter icon">
</button>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="fixed w-screen transition duration-300 z-50 h-screen top-0 left-0 bg-black/30 inset-0 backdrop-blur-sm"
    class:pointer-events-all={open}
    class:opacity-0={!open}
    class:pointer-events-none={!open}
    onclick={() => {
        open = false;
    }}
></div>

<div
    class="fixed flex p-5 z-50 transition duration-300 top-0 right-0 h-screen w-2/5 bg-white shadow-lg inset-y-0 max-lg:w-3/5 max-sm:w-full"
    class:translate-x-[110%]={!open}
    class:translate-x-0={open}
>
    <div class="flex flex-col gap-10 w-full">
        <p class="text-3xl max-md:w-11/12">{content.title}</p>
        <div class="flex flex-col gap-2 h-full overflow-y-auto overflow-x-hidden max-lg:gap-1">
            {@html  marked.parse(content.content)}
        </div>
        <button
            type="button"
            class="fixed top-5 right-5 w-6 h-6 p-1"
            onclick={() => {
                open = false;
            }}
        >
            <img
                class="w-full object-contain"
                src="/cross.svg"
                alt="cross icon"
            />
        </button>
    </div>
</div>
