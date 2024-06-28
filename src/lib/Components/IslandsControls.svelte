<script>
  import { fade } from 'svelte/transition';
  import { sceneStore } from '$lib/store.js';

  const scenes = ['island-desert', 'island-ice', 'island-ruins', 'island-fire'];
  let lastValidScene = ''; 

  const setScene = scene => {
    sceneStore.set(scene);
  }

  $: {
    const value = $sceneStore;
    if (value === 'idle') {
      lastValidScene = ''; 
    } else if (scenes.includes(value)) {
      lastValidScene = value; 
    }
  }
</script>

<div transition:fade={{ duration: 300 }} class="absolute w-40 left-8 top-8 flex flex-col gap-2 items-center drop-shadow-[0_5px_5px_rgba(255,255,255,0.5)]">
  <div class="flex items-center justify-between gap-4">
    {#each scenes as scene}
      <button
        class="{ lastValidScene === scene ? '' : 'brightness-50' } flex items-center justify-center"
        on:click|stopPropagation={setScene.bind(null, scene)}
      >
        <img src={`/portal-${scene}.svg`} alt={`island ${scene}`} class="max-w-full max-h-full"/>
      </button>
    {/each}
  </div>
  <div class="font-garamond font-semibold text-2xl text-white whitespace-nowrap uppercase">
    {#if $sceneStore === 'idle'}
      <!-- Show nothing when sceneStore is 'idle' -->
       {'world map'}
    {:else}
      {lastValidScene.replace(/-/g, ' ')}
    {/if}
  </div>
</div>
