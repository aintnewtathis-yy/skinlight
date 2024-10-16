<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let progress;
	let open = $state(false);
	let maxEdge = 20000;
	let minEdge = 0;
	let minValue = $state(minEdge);
	let maxValue = $state(maxEdge);
	let minGap = 1000;
	let btn;

	function updateUrl() {
		const params = new URLSearchParams($page.url.search);
		params.set('minPrice', minValue);
		params.set('maxPrice', maxValue);
		goto(`?${params.toString()}`, { replaceState: true });
	}

	function rangeHandle(e) {
		if (e.srcElement.classList.contains('range-min')) {
			minValue = Number(e.srcElement.value);
			if (maxValue - minValue < minGap) {
				minValue = maxValue - minGap;
			}

			progress.style.left = (minValue / maxEdge) * 100 + '%';
		} else if (e.srcElement.classList.contains('range-max')) {
			maxValue = Number(e.srcElement.value);

			if (maxValue - minValue < minGap) {
				maxValue = minValue + minGap;
			}
			progress.style.right = 100 - (maxValue / maxEdge) * 100 + '%';
		}
	}

	$effect(() => {
		window.addEventListener('click', (e) => {
			if (e.target !== btn && !btn.contains(e.target)) {
				open = false;
			}
		});
	});
</script>

<div bind:this={btn} class="z-10 -ml-2">
	<button
		class="flex items-center gap-2 rounded-sm px-3 py-2 transition duration-300 hover:bg-bgColor focus:bg-bgColor active:bg-bgColor"
		type="button"
		onclick={() => {
			open = !open;
		}}
	>
		<span class="leading-none">Цена</span>
		<img
			src="arrow-filter.svg"
			alt="arrow icon"
			class="transition duration-300"
			class:rotate-180={open}
		/>
	</button>
	<div
		class="absolute bg-white left-0 top-[120%] flex flex-col gap-4 rounded border border-borderColor p-4 shadow transition duration-300"
		class:opacity-0={!open}
		class:opacity-100={open}
		class:translate-y-0={open}
		class:translate-y-4={!open}
		class:pointer-events-none={!open}
		class:pointer-events-auto={open}
	>
		<div class="flex justify-between gap-4">
			<div class="flex items-center gap-2">
				<span>от</span>
				<input
					class="w-fit max-w-28 rounded border border-borderColor px-3 py-3 text-center"
					type="number"
					placeholder="0"
					bind:value={minValue}
				/>
			</div>
			<div class="flex items-center gap-2">
				<span>до</span>
				<input
					class="w-fit max-w-28 rounded border border-borderColor px-3 py-3 text-center"
					type="number"
					placeholder="0"
					bind:value={maxValue}
				/>
			</div>
		</div>
		<div>
			<div class="flex h-1 w-full rounded bg-dullHover">
				<div class="absolute left-0 right-0 h-full rounded bg-accent" bind:this={progress}></div>
			</div>
			<div class="range-input">
				<input
					type="range"
					class="range-min"
					min={minEdge}
					max={maxEdge}
					bind:value={minValue}
					step="100"
					oninput={rangeHandle}
					onchange={updateUrl}
				/>
				<input
					type="range"
					class="range-max"
					min={minEdge}
					max={maxEdge}
					bind:value={maxValue}
					step="100"
					oninput={rangeHandle}
					onchange={updateUrl}
				/>
			</div>
		</div>
	</div>
</div>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}

	.range-input input {
		position: absolute;
		left: 0;
		width: 100%;
		height: 5px;
		top: -5px;
		background: none;
		pointer-events: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}
	input[type='range']::-webkit-slider-thumb {
		height: 17px;
		width: 17px;
		border-radius: 50%;
		background: #4a3931;
		pointer-events: auto;
		-webkit-appearance: none;
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
	}
	input[type='range']::-moz-range-thumb {
		height: 17px;
		width: 17px;
		border: none;
		border-radius: 50%;
		background: #4a3931;
		pointer-events: auto;
		-moz-appearance: none;
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
	}
</style>
