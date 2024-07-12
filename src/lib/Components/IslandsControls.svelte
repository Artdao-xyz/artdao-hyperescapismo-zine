<script>
	import { fade } from 'svelte/transition';
	import { sceneStore } from '$lib/store.js';
	import { onMount } from 'svelte';

	const scenes = ['island-desert', 'island-ice', 'island-ruins', 'island-fire'];
	let lastValidScene = '';

	const setScene = (scene) => {
		sceneStore.set(scene);
	};

	const artworkGroups = [
		{ range: [1, 5], scene: 'island-fire' },
		{ range: [6, 10], scene: 'island-ice' },
		{ range: [11, 15], scene: 'island-desert' },
		{ range: [16, 20], scene: 'island-ruins' }
	];

	const getSceneFromArtwork = (artworkId) => {
		const artworkNum = parseInt(artworkId.replace('artwork', ''), 10);
		const group = artworkGroups.find(
			(group) => artworkNum >= group.range[0] && artworkNum <= group.range[1]
		);
		return group ? group.scene : '';
	};

	$: {
		if ($sceneStore === 'idle') {
			lastValidScene = '';
		} else if (scenes.includes($sceneStore)) {
			lastValidScene = $sceneStore;
		} else {
			lastValidScene = getSceneFromArtwork($sceneStore);
		}
	}
</script>

<div
	in:fade={{ delay: 2000, duration: 1000 }}
	class="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-8 bottom-4 md:top-8 flex flex-col gap-3 items-center drop-shadow-cloud w-full md:w-auto h-fit"
>
	{#if $sceneStore.includes('artwork')}
		<button
			on:click|stopPropagation={setScene.bind(null, lastValidScene)}
			class="{$sceneStore === 'idle'
				? ''
				: 'opacity-75'} absolute bottom-0 left-4 md:relative md:left-0 self-start uppercase font-semibold font-garamond tracking-wide border-y-[1px] border-white text-white py-1"
			>return</button
		>
	{:else}
		<div class="flex items-center justify-between gap-4">
			<button
				on:click|stopPropagation={setScene.bind(null, 'idle')}
				class="{$sceneStore === 'idle' ? '' : 'opacity-25'} absolute left-2 md:relative md:inset-0"
				><img src="/go-back.png" alt="return" />
			</button>

			{#each scenes as scene}
				<button
					class="{lastValidScene === scene
						? ''
						: 'invert opacity-50'} flex items-center justify-center"
					on:click|stopPropagation={setScene.bind(null, scene)}
				>
					<img
						draggable="false"
						src={`/portal-${scene}.svg`}
						alt={`island ${scene}`}
						class="max-w-full max-h-full"
					/>
				</button>
			{/each}
		</div>
	{/if}

	<div
		transition:fade={{ delay: 500, duration: 500 }}
		class="hidden md:block font-garamond w-full font-semibold text-2xl text-white whitespace-nowrap uppercase"
	>
		{#if $sceneStore.startsWith('island')}
			{lastValidScene.replace(/island-/g, '')}

			<div class="space-y-2 mt-3">
				<div class="text-white font-normal text-sm font-monda capitalize tracking-wide">
					transformation
				</div>
				<div class="text-white font-normal text-sm font-monda capitalize tracking-wide">
					rebirth
				</div>
				<div class="text-white font-normal text-sm font-monda capitalize tracking-wide">
					forging new ideas
				</div>
			</div>
		{/if}
	</div>
</div>
