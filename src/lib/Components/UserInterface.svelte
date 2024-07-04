<script>
	import { fade } from 'svelte/transition';

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
<ArtworkInfo />
<ArtworkBidding />

<!-- ISLANDS INFO -->
<IslandInfo />
