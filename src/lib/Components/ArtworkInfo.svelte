<script>
	import { fade } from 'svelte/transition';
	import { sceneStore } from '$lib/store.js';

	const scenes = ['island-desert', 'island-ice', 'island-ruins', 'island-fire'];
	let lastValidScene = '';
	let isArtworkSelected = true;

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
		if (scenes.includes($sceneStore)) {
			lastValidScene = $sceneStore;
		} else if ($sceneStore.startsWith('artwork')) {
			lastValidScene = getSceneFromArtwork($sceneStore);
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if $sceneStore.startsWith('artwork')}
	<div
		in:fade={{ delay: 2000, duration: 1000 }}
		on:click|stopPropagation
		class="select-none cursor-default md:absolute md:left-4 md:-translate-x-0 md:bottom-4 space-y-2 w-full md:w-auto px-4 md:px-0"
	>
		<div class="relative flex items-center justify-between gap-1 md:gap-0">
			<button
				on:click={() => (isArtworkSelected = true)}
				class="relative"
				class:opacity-50={!isArtworkSelected}
			>
				<img draggable="false" src="/artwork-label.png" alt="artwork label" />
				<span
					class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm font-semibold font-garamond uppercase tracking-wide"
					>artwork</span
				>
			</button>
			<button
				on:click={() => (isArtworkSelected = false)}
				class="relative"
				class:opacity-50={isArtworkSelected}
			>
				<img draggable="false" src="/artist-label.png" alt="artist label" />
				<span
					class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm font-semibold font-garamond uppercase tracking-wide"
					>artist</span
				>
			</button>
			<img
				draggable="false"
				class="absolute left-1/2 -translate-x-1/2 -bottom-2.5"
				src={`${lastValidScene}-icon.png`}
				alt="scene icon"
			/>
		</div>

		<div class="relative">
			<img draggable="false" class="sm:hidden w-full" src="/artwork-info-mobile.png" alt="artwork info"/>
			<img draggable="false" class="hidden sm:block md:hidden w-full" src="/artwork-info-md.png" alt="artwork info"/>
			<img draggable="false" class="hidden md:block w-fit" src="/artwork-info.png" alt="artwork info" />
			{#if isArtworkSelected}
				<div
					class="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 flex gap-2 md:flex-col md:gap-3 md:w-2/3"
				>
					<h1
						class="text-white text-sm md:text-2xl font-semibold font-garamond uppercase tracking-wide"
					>
						Eye faces character
					</h1>
					<p class="text-white text-xs font-monda tracking-tight font">
						The Island of Fire offers an escape through intensity and passion.
					</p>
				</div>
			{:else}
				<div
					class="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 flex md:flex-col gap-3 md:w-2/3"
				>
					<h1
						class="text-white text-sm md:text-2xl font-semibold font-garamond uppercase tracking-wide"
					>
						Artist Name
					</h1>
					<p class="text-white text-xs font-monda tracking-tight px-2">
						The Island of Fire offers an escape through intensity and passion.
					</p>
				</div>
			{/if}
		</div>
	</div>
{/if}
