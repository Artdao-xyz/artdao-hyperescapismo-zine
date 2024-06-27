<script>
    import { fade } from 'svelte/transition';
    import { sceneStore } from '$lib/store.js';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if $sceneStore.startsWith('artwork')}
    <div transition:fade={{ duration: 300 }} on:click|stopPropagation class="cursor-default absolute right-4 bottom-4 font-monda text-white text-center space-y-4 bg-black bg-opacity-25 border-2 border-white px-16 py-5">
        <div class="flex items-center text-xs capitalize tracking-wide gap-3">
            <span>open auction</span>
            <span>2d 23h 12m</span>
        </div>
        <div class="flex items-center justify-between text-xl tracking-wide">
            <span>1.000Ξ</span>
            <span>($3.4K)</span>
        </div>

        <div class="text-xs tracking">0.69 bid by Vitalik.eth</div>

        <button><img src="/bid.png" alt="bid"></button>
    </div>
{/if}