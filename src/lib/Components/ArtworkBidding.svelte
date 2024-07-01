<script>
    import { fade } from 'svelte/transition';
    import { sceneStore } from '$lib/store.js';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if $sceneStore.startsWith('artwork')}
    <div in:fade={{ delay: 2000 , duration: 1000 }} on:click|stopPropagation class="select-none cursor-default absolute right-4 bottom-4 font-monda text-white text-center">
        
        <img draggable="false" class="w-full" src="/bidding-info.png" alt="artwork bidding">
        
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4 px-16 py-5 w-full">
            <img draggable="false" class="absolute -top-3 left-1/2 -translate-x-1/2" src="/island-fire-icon.png" alt="island fire icon">
            
            <div class="flex justify-between text-xs capitalize tracking-wide gap-3">
                <span>open auction</span>
                <span>2d 23h 12m</span>
            </div>
            <div class="flex items-center justify-between text-xl tracking-wide">
                <span>1.000Ξ</span>
                <span>($3.4K)</span>
            </div>

            <div class="text-xs tracking-tight">0.69 bid by Vitalik.eth</div>

            <button><img draggable="false" src="/bid.png" alt="bid"></button>
        </div>
    </div>
{/if}