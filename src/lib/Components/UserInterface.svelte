<script>
	import { fade } from 'svelte/transition';
	import { sceneStore } from '$lib/store.js';

	import Inactivity from './Inactivity.svelte';
	import Toggle from '$lib/Components/Toggle.svelte';
	import ConnectWallet from '$lib/Components/ConnectWallet.svelte';
	import ArtworkInfo from '$lib/Components/ArtworkInfo.svelte';
	import ArtworkBidding from '$lib/Components/ArtworkBidding.svelte';
	import IslandInfo from '$lib/Components/IslandInfo.svelte';
	import Arrows from '$lib/Components/Arrows.svelte';
	import IslandsControls from '$lib/Components/IslandsControls.svelte';
	import Logo from '$lib/Components/Logo.svelte';
</script>

<!-- ISLAND CONTROLS -->
<IslandsControls />

<!-- LOGO -->
<Logo />

<!-- CONNECT BUTTON -->
<div class="absolute right-0 top-0 md:right-8 md:top-7 flex items-center gap-2 h-full md:h-auto">
	<Toggle />
	<ConnectWallet />
</div>

<!-- RIGHT|LEFT BUTTONS -->
<Arrows />

<!-- ARTWORKS INFO -->
 <div class="absolute left-0 bottom-16 md:bottom-0 w-full h-fit space-y-2.5">
	<ArtworkInfo />
	<ArtworkBidding />
</div>

<!-- ISLANDS INFO -->
<IslandInfo />

{#if $sceneStore.includes('island')}
	<Inactivity>
		Drag screen to navigate around the Island.
	</Inactivity>
{:else if $sceneStore.includes('idle')}
	<Inactivity>
		Click an Island to explore.
	</Inactivity>
{/if}
