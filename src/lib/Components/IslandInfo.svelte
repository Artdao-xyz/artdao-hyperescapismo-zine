<script>
	import { fade } from 'svelte/transition';
	import { sceneStore } from '$lib/store.js';

	let showDragScreen = false;
	let timer;

	const scenes = [
		{
			id: 'island-fire',
			text: 'From ashes to dust, emerges a new rebirth where relentless flames transform and fortify, forging rare gems and stones.',
			artwork: 'artwork1'
		},
		{
			id: 'island-ruins',
			text: 'In the deep heart of the forest, tranquility reigns, whispering ancestral secrets that blossom into inner creativity.',
			artwork: 'artwork16'
		},
		{
			id: 'island-ice',
			text: 'In the solitude of glaciers, coldness rises as a monument to introspection and isolation, capturing the pristine and fragile beauty of frozen landscapes.',
			artwork: 'artwork6'
		},
		{
			id: 'island-desert',
			text: 'In the vast emptiness of the desert, where sand dances in the wind — a storm of creativity and existentialism shapes new forms and ideas from the ever-shifting sands.',
			artwork: 'artwork11'
		}
	];

	$: {
		if ($sceneStore) {
			showDragScreen = true;
			clearTimeout(timer); // Clear any existing timer
			timer = setTimeout(() => {
				showDragScreen = false;
			}, 5000);
		}
	}
</script>

{#each scenes as scene}
	{#if $sceneStore === scene.id}
		<div
			in:fade={{ delay: 2000, duration: 1000 }}
			class="absolute w-full px-4 md:px-0 bottom-16 md:bottom-4 left-1/2 -translate-x-1/2"
		>
			<img
				draggable="false"
				class="hidden mx-auto sm:block select-none relative"
				src="/island-info.png"
				alt="island info"
			/>
			<img
				draggable="false"
				class="sm:hidden select-none relative mx-auto"
				src="/island-info-mobile.png"
				alt="island info"
			/>
			<img
				draggable="false"
				class="select-none absolute -top-2 left-1/2 -translate-x-1/2"
				src={`${scene.id}-icon.png`}
				alt="{scene.id} icon"
			/>
			<div
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-fit sm:w-full space-y-4 pt-2 md:py-0 text-center"
			>
				<p
					class="relative sm:w-1/2 xl:w-1/3 mx-auto px-10 text-center text-white text-xs md:text-sm font-monda font-light leading-tight tracking-wide"
				>
					{scene.text}
				</p>
				<div class="inline-block space-y-1">
					<hr class="outline-[1px]" />
					<button
						on:click|stopPropagation={() => sceneStore.set(scene.artwork)}
						class="text-white font-garamond uppercase font-semibold text-sm md:text-base tracking-wide px-4"
						>navigate collection</button
					>
					<hr class="outline-[1px]" />
				</div>
			</div>
		</div>
	{/if}
{/each}
