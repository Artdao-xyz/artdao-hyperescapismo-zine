<script>
    import '/src/style.css';
    import { onMount } from 'svelte';
    import Experience from '$lib/Experience/Experience.js';
	import Loading from '../lib/Components/Loading.svelte';
    import { loadingStore, sceneStore, transitionStore } from '$lib/store.js';
    import gsap from 'gsap';
    import Transition from '../lib/Components/Transition.svelte';
    import UI from '../lib/Components/UI.svelte';
    import { fade } from 'svelte/transition';


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
            console.log(state)
        });

        const transitionn = transitionStore.subscribe((value) => {
            transition = value;
            console.log('transition', transition)
        });
        
        
        const experience = new Experience(canvas);

        return () => {
            experience.destroy();
            // canvas.remove();
            
            // loading();
            // scene();
            // transitionn();

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


<!-- {#if state != "idle" && state != 'island-fire' && state != 'island-desert' && state != 'island-ice' && state != 'island-ruins' } -->
    <UI/>
<!-- {/if} -->

{#if state == 'island-fire'}
    <div class="text-white text-center absolute left-1/2 -translate-x-1/2 bottom-0 w-full space-y-0" transition:fade={{ delay: 250, duration: 300 }}>
        <!-- <h1 class="font-garamond text-5xl font-semibold -mb-20">ISLAND FIRE</h1> -->
        <div class="relative w-fit mx-auto">
            <img src="/island-info.png" alt="island">
            <!-- <p class="font-monda absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">O ArtDAO tem trabalhado nos últimos meses em nossa própria infraestrutura de mercado na plataforma Fuel,</p> -->
        </div>
    </div>

{/if}

{#if state == 'artwork1'}
<div transition:fade={{ delay: 250, duration: 300 }}>
    <div class="font-garamond text-white absolute left-1/2 -translate-x-1/2 top-10 text-center space-y-4">
        <h1 class="text-4xl font-semibold">ARTWORK #001</h1>
        <h1 class=" text-2xl font-semibold">ARTWORK #001</h1>
        <img src="/artwork-banner.png" alt="artwork">
    </div>
    <div class="font-monda text-white absolute w-full left-1/2 -translate-x-1/2 bottom-0 text-sm text-center tracking-wide">
        <img class="mx-auto" src="/artwork-info.png" alt="artwork">
        <div class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 space-y-2">
            <div>
                <p>Reserve</p>
                <p>1.000E ($3.4K)</p>
            </div>
            <div class="font-garamond font-semibold text-base border-y-2 border-of py-1 flex items-center gap-2">
                <img class="-rotate-90" src="/artwork-sign.png" alt="mint">
                <button>MINT</button>
                <img class="rotate-90" src="/artwork-sign.png" alt="mint">
            </div>
        </div>
    </div>
</div>
{/if}

<!-- <div class="select-none absolute transparent w-full bottom-0 text-black text-xl flex justify-center items-center z-10 gap-20 p-4">
    <button class="bg-white rounded-3xl px-8 py-1">World</button>    
    <button class="bg-white rounded-3xl px-8 py-1">Artists</button>
    <button class="bg-white rounded-3xl px-8 py-1">Event</button>
    <button class="bg-white rounded-3xl px-8 py-1">Lore</button>
</div> -->



<!-- {#if transition}
    <Transition />
{/if} -->
