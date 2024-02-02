<script>
    import '/src/style.css';
    import { onMount } from 'svelte';
    import Experience from '$lib/Experience/Experience.js';
	import Loading from '../lib/Components/Loading.svelte';
    import { loadingStore, sceneStore, transitionStore } from '$lib/store.js';
    import gsap from 'gsap';
    import Transition from '../lib/Components/Transition.svelte';
    import UI from '../lib/Components/UI.svelte';

    let progress = 0;
    let canvas;
    let state = '';
    let transition = null;

    onMount(() => {
        const loading = loadingStore.subscribe((value) => {
            progress = value;
        });
        
        const scene = sceneStore.subscribe((value) => {
            state = value;
        });

        const transitionn = transitionStore.subscribe((value) => {
            transition = value;
        });
        
        
        const experience = new Experience(canvas);

        return () => {
            experience.destroy();
            canvas.remove();
            loading();
            scene();
            transitionn();

        }
        
    });

    // const transitionn = () => {
    //         transition = true;
    //         gsap.delayedCall(4, () => {
    //             transition = false;
    //         });
    //         // transition = false;
    
    //     // transition = false;
    // }
    
</script>

<Loading progress={progress} />

<canvas bind:this={canvas}></canvas>



<UI/>

<div class="absolute transparent w-full bottom-0 text-black text-xl flex justify-center items-center z-10 gap-20 p-4">
    <button class="bg-white rounded-3xl px-8 py-1">World</button>    
    <button class="bg-white rounded-3xl px-8 py-1">Artists</button>
    <button class="bg-white rounded-3xl px-8 py-1">Event</button>
    <button class="bg-white rounded-3xl px-8 py-1">Lore</button>
</div>



{#if transition}
    <Transition />
{/if}
