<script>
    import { fade } from 'svelte/transition';
    import { sceneStore } from '$lib/store.js';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if $sceneStore.startsWith('artwork')}
    <div transition:fade={{ duration: 300 }} on:click|stopPropagation class="cursor-default absolute left-4 bottom-4 bg-black bg-opacity-35 space-y-3">
        <div class="flex gap-3">
        <div class="flex-1 text-white text-center text-sm font-semibold font-garamond uppercase leading-7 tracking-wide p-4 border-2 border-white">artwork</div>
        <div class="flex-1 text-white text-center text-sm font-semibold font-garamond uppercase leading-7 tracking-wide p-4 border-2 border-white">artist</div>
        </div>
        <div class="p-4 border-2 border-white space-y-3">
        <h1 class="text-white w-1/2 text-2xl font-semibold font-garamond uppercase tracking-wide">Eye faces character</h1>
        <p class="text-white w-2/3 text-xs font-monda tracking-tight">The Island of Fire offers an escape through intensity and passion.</p>
        </div>
    </div>
{/if}