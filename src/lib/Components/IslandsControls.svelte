<script>
  import { fade } from 'svelte/transition';
  import { sceneStore } from '$lib/store.js';

  const scenes = ['island-desert', 'island-ice', 'island-ruins', 'island-fire'];
  let lastValidScene = ''; 

  const setScene = scene => {
    sceneStore.set(scene);
  }

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
    const value = $sceneStore;
    if (value === 'idle') {
      lastValidScene = ''; 
    } else if (scenes.includes(value)) {
      lastValidScene = value; 
    } else {
      lastValidScene = getSceneFromArtwork($sceneStore);
    }
  }
</script>

<div in:fade={{ delay: 2000 , duration: 1000 }} class="absolute left-8 top-8 flex flex-col gap-2 items-center drop-shadow-[0_0px_5px_rgba(255,255,255,0.5)]">
  <div class="flex items-center justify-between gap-4">
    {#each scenes as scene}
      <button
        class="{ lastValidScene === scene ? '' : 'invert opacity-50' } flex items-center justify-center"
        on:click|stopPropagation={setScene.bind(null, scene)}
      >
        <img draggable="false" src={`/portal-${scene}.svg`} alt={`island ${scene}`} class="max-w-full max-h-full"/>
      </button>
    {/each}
  </div>
  <div class="font-garamond w-full font-semibold text-2xl text-white whitespace-nowrap uppercase">
    {#if $sceneStore === 'idle'}
      <!-- Show nothing when sceneStore is 'idle' -->
       {'world map'}
    {:else}

      {lastValidScene.replace(/island-/g, '')}
      
      <div class="space-y-3 mt-4">
        <div class="text-white font-normal text-sm font-monda capitalize tracking-wide">transformation</div>
        <div class="text-white font-normal text-sm font-monda capitalize tracking-wide">rebirth</div>
        <div class="text-white font-normal text-sm font-monda capitalize tracking-wide">forging new ideas</div>
      </div>
      {/if}
    </div>

</div>
