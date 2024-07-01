<script>
    import { fade } from 'svelte/transition';
    
    import Toggle from '$lib/Components/Toggle.svelte'
    import ConnectWallet from '$lib/Components/ConnectWallet.svelte'
    import ArtworkInfo from '$lib/Components/ArtworkInfo.svelte'
    import ArtworkBidding from '$lib/Components/ArtworkBidding.svelte'
    import IslandInfo from '$lib/Components/IslandInfo.svelte'
    import Arrows from '$lib/Components/Arrows.svelte'
    import IslandsControls from '$lib/Components/IslandsControls.svelte'
    import Logo from '$lib/Components/Logo.svelte'
</script>

<!-- ISLAND CONTROLS -->
<IslandsControls/>

<!-- LOGO -->
<Logo/>

<!-- CONNECT BUTTON -->
<div in:fade={{ delay: 2000 , duration: 1000 }} class="absolute right-8 top-7 flex items-center">
    <Toggle/>
    <ConnectWallet/>
</div>

<!-- RIGHT|LEFT BUTTONS -->
<Arrows/>

<!-- ARTWORKS INFO -->
<ArtworkInfo/>
<ArtworkBidding/>

<!-- ISLANDS INFO -->
<IslandInfo/>

  
  