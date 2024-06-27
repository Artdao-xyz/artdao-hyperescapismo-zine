<script>
  import { fade } from 'svelte/transition';
  import { sceneStore } from '$lib/store.js';

  const scenes = ['island-desert', 'island-ice', 'island-ruins', 'island-fire'];
  let lastValidScene = ''; 
  const setScene = scene => {
    sceneStore.set(scene);
  }

  const unsubscribe = sceneStore.subscribe(value => {
    if (value === 'idle') {
      lastValidScene = ''; 
    } else if (scenes.includes(value)) {
      lastValidScene = value; 
    }
  });

  // Clean up subscription when component unmounts
  // onDestroy(() => {
  //   unsubscribe();
  // });
</script>

<div transition:fade={{ duration: 300 }} class="absolute w-40 left-8 top-8 flex flex-col gap-2 items-center">
  <div class="flex items-center justify-between gap-4">
    {#each scenes as scene}
      <button
        class="{ $sceneStore === scene ? '' : 'brightness-50' } flex items-center justify-center"
        on:click|stopPropagation={setScene.bind(null, scene)}
      >
        <img src={`/portal-${scene}.svg`} alt={`island ${scene}`} class="max-w-full max-h-full"/>
      </button>
    {/each}
  </div>
  <div class="font-garamond font-semibold text-2xl text-white whitespace-nowrap uppercase">
    {#if $sceneStore === 'idle'}
      <!-- Show nothing when sceneStore is 'idle' -->
    {:else}
      {lastValidScene.replace(/-/g, ' ')}
    {/if}
  </div>
</div>
