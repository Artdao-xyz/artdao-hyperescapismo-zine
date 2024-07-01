<script>
    import { fade } from 'svelte/transition';
    import { sceneStore } from '$lib/store.js';

    let showDragScreen = false;
    let timer;

    const scenes = [
        {
            id: 'island-fire',
            text: "From ashes to dust, a new renaissance emerges, where the relentless flames transform and fortify, forging rare gems and stones — a completely renewed self forged by fire."
        },
        {
            id: 'island-ruins',
            text: "In the ruins of the past, echoes of forgotten glory and wisdom resound, teaching us the lessons of history."
        },
        {
            id: 'island-ice',
            text: "The icy winds whisper secrets of endurance and strength, carving beauty into the frozen landscape."
        },
        {
            id: 'island-desert',
            text: "Amidst the vast desert sands, the quest for survival reveals the true essence of resilience and hope."
        }
    ];


    $: {
        if ($sceneStore) {
            showDragScreen = true;
            clearTimeout(timer); // Clear any existing timer
            timer = setTimeout(() => {
                showDragScreen = false;
            }, 5000);
        }
    }

</script>

{#each scenes as scene}
    {#if $sceneStore === scene.id}
        <div in:fade={{ delay: 2000 , duration: 1000 }} class="absolute bottom-4 left-1/2 -translate-x-1/2">
            <img draggable="false" class="select-none relative" src="/island-info.png" alt="island info">
            <img draggable="false" class="select-none absolute -top-5 left-1/2 -translate-x-1/2" src={`${scene.id}-icon.png`} alt="{scene.id} icon">
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full space-y-5 p-4 text-center">
                <p class="text-center text-white text-sm font-monda font-light leading-tight tracking-wide">
                    {scene.text}
                </p>
                <div class="inline-block space-y-1">
                    <hr class="outline-[1px]">
                    <button on:click|stopPropagation={() => sceneStore.set('artwork1')} class="text-white font-garamond uppercase tracking-wide px-4">navigate collection</button>
                    <hr class="outline-[1px]">
                </div>
            </div>
        </div>
        <!-- DRAG -->
        {#if showDragScreen}
            <div in:fade={{ delay: 2000 , duration: 1000 }} class="select-none absolute left-1/2 -translate-x-1/2 top-1/2 text-white text-sm font-monda tracking-wide drop-shadow-[0_5px_5px_rgba(255,255,255,0.5)]">drag screen to Navigate around the island</div>
        {/if}
    {/if}
{/each} 
