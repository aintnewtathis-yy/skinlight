<script>
    let open = $state(false);
</script>

<div class="overflow-hidden">
	<button class="flex items-center gap-2" type="button"
    
    onclick={() => {
        open = !open
    }}>
		<span>Ввести промокод</span>
		<img src="/arrow-filter.svg" alt="arrow icon" />
	</button>
    <div 
        class="overflow-hidden transition-all duration-300 "
        class:max-h-16={open}
        class:max-h-0={!open}
        class:pt-2={open}
        class:pt-0={!open}
    >
        <input type="text" placeholder="PROMO" class="basic-input">
    </div>
</div>
