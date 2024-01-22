<script>
    import '/src/style.css';
    import { onMount } from 'svelte';
    import Experience from '$lib/Experience/Experience.js';
	import Loading from '../lib/Components/Loading.svelte';
    import { loadingStore, sceneStore } from '$lib/store.js';
    
    let progress = 0;
    let canvas;
    let state = '';

    onMount(() => {

        const loading = loadingStore.subscribe((value) => {
            progress = value;
        });

        const scene = sceneStore.subscribe((value) => {
            state = value;
        });


        
        const experience = new Experience(canvas);

        return () => {
            loading();
            scene();
            // cleanup
            experience.destroy();
            canvas.remove();
        }
    });
    
</script>

<Loading progress={progress} />

<canvas bind:this={canvas}></canvas>

<div class="absolute top-0 left-1/2 -translate-x-1/2 z-10">
    <button on:click={ () => sceneStore.set("idle") } class="text-red-700">go to Idle</button>
</div>

<div class="absolute w-full top-1/2 flex justify-between items-center z-10">
    <button class="text-red-700">Left</button>
    <button class="text-red-700">Right</button>
</div>

<div class="absolute w-full bottom-0 z-10">
    <div class=" flex justify-evenly items-center">
        <button class="text-red-700">Artists</button>
        <button class="text-red-700">Event</button>
        <button class="text-red-700">Lore</button>
    </div>
</div>