<script>
    import { fade } from 'svelte/transition';
    import { sceneStore } from '$lib/store.js';

    let bids = [
        { id: 1, amount: '0.69 ETH', bidder: 'Vitalik.eth' },
        { id: 2, amount: '0.75 ETH', bidder: 'Alice.eth' },
        { id: 3, amount: '0.80 ETH', bidder: 'Bob.eth' },
        { id: 4, amount: '0.72 ETH', bidder: 'Charlie.eth' },
        { id: 5, amount: '0.78 ETH', bidder: 'David.eth' },
        { id: 6, amount: '0.82 ETH', bidder: 'Eve.eth' },
        { id: 7, amount: '0.70 ETH', bidder: 'Frank.eth' },
        { id: 8, amount: '0.76 ETH', bidder: 'Grace.eth' },
        { id: 9, amount: '0.79 ETH', bidder: 'Harry.eth' },
        { id: 10, amount: '0.74 ETH', bidder: 'Isabel.eth' },
        // Add more bids as needed
    ];

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
        const group = artworkGroups.find(group => artworkNum >= group.range[0] && artworkNum <= group.range[1]);
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
    <div in:fade={{ delay: 2000 , duration: 1000 }} on:click|stopPropagation class="select-none cursor-default absolute right-1/2 translate-x-1/2 md:-translate-x-0 md:right-4 bottom-16 md:bottom-4 w-full md:w-auto px-7 md:px-0 font-monda text-white text-center">
        
        <img draggable="false" class="hidden md:block" src="/bidding-info.png" alt="artwork bidding">
        <img draggable="false" class="md:hidden w-full" src="/bidding-info-mobile.png" alt="artwork bidding">
        
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex md:flex-col items-center gap-3 px-10 md:px-16 py-5 w-full">
            <!-- <img draggable="false" class="hidden md:block absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2" src={`${lastValidScene}-icon.png`} alt="scene icon"> -->
            
            <div class="flex flex-col md:flex-row items-start justify-between text-[10px] capitalize tracking-wide md:gap-3">
                <span class="hidden md:block">open auction</span>
                <span class="md:hidden">last bid</span>
                <span class="text-nowrap">2d 23h 12m</span>
            </div>
            <div class="relative flex items-center gap-1 md:text-lg tracking-wide">
                <input class="w-full pl-2 h-10 rounded border border-slate-200 focus:border-2 focus:border-white outline-none" type="number" required placeholder="1.0"><span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm opacity-50">ETH</span>
                <!-- <span class="ml-2 text-xs">($3.4K)</span> -->
            </div>

            <div class="hidden md:block h-8 text-[10px] tracking-tight leading-none	 border-t border-white space-y-1.5 overflow-y-auto">
                {#each bids as bid}
                    <div class="">
                        {bid.amount} bid by {bid.bidder}
                    </div>
                {/each}
            </div>

            <button class=""><img draggable="false" src="/bid.png" alt="bid"></button>
        </div>
    </div>
{/if}


<style>
    /* Hide arrows in Firefox */
    input[type="number"] {
        -moz-appearance: textfield;
    }

    /* Hide arrows in Chrome, Safari, Edge, Opera */
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
