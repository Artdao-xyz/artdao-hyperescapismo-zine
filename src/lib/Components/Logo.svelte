<script>
    import { fade } from 'svelte/transition';
    import { sceneStore } from '$lib/store.js';
</script>

<button  class="absolute top-4 left-1/2 -translate-x-1/2" on:click|stopPropagation={ () => sceneStore.set('idle') } ><img class="drop-shadow-[0_5px_5px_rgba(255,255,255,0.5)]" src="/logo-hyperescapismo.svg" alt="Hyperescapismo"></button>