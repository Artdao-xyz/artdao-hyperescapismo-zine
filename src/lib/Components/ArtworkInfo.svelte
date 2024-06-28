<script>
    import { fade } from 'svelte/transition';
    import { sceneStore } from '$lib/store.js';

    const scenes = ['island-desert', 'island-ice', 'island-ruins', 'island-fire'];
    let lastValidScene = ''; 
    let isArtworkSelected = true;

    $: if (scenes.includes($sceneStore)) {
        lastValidScene = $sceneStore; 
        console.log('lastValidScene', lastValidScene);
    }
</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if $sceneStore.startsWith('artwork')}
    <div transition:fade={{ duration: 300 }} on:click|stopPropagation class="cursor-default absolute left-4 bottom-4 space-y-2 ">
        <div class="relative flex items-center justify-between">
            <button on:click={() => isArtworkSelected = true} class="relative" class:opacity-50={!isArtworkSelected}>
                <img src="/artwork-label.png" alt="artwork label">
                <span class=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm font-semibold font-garamond uppercase tracking-wide">artwork</span>
            </button>
            <button on:click={() => isArtworkSelected = false} class="relative" class:opacity-50={isArtworkSelected}>
                <img src="/artist-label.png" alt="artist label">
                <span class=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm font-semibold font-garamond uppercase tracking-wide">artist</span>
            </button>
            <img class="absolute left-1/2 -translate-x-1/2 -bottom-4" src={`${lastValidScene}-icon.png`} alt="scene icon">
        </div>

        <div class="relative">
            <img src="/artwork-info.png" alt="artwork info">
            <div class="absolute left-12 top-1/2 -translate-y-1/2 space-y-3 w-2/3">
                <h1 class="text-white text-2xl font-semibold font-garamond uppercase tracking-wide">Eye faces character</h1>
                <p class="text-white text-xs font-monda tracking-tight">The Island of Fire offers an escape through intensity and passion.</p>
            </div>
        </div>
    </div>
{/if}
