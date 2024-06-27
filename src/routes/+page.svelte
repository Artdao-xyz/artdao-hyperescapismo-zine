<script>
    import '/src/style.css';
    import { onMount } from 'svelte';
    import Experience from '$lib/Experience/Experience.js';
	import Loading from '../lib/Components/Loading.svelte';
    import { loadingStore, sceneStore, transitionStore } from '$lib/store.js';
    import UserInterface from '$lib/Components/UserInterface.svelte';


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
    
</script>

<Loading progress={progress} />
<UserInterface/>
   
<canvas bind:this={canvas}></canvas>