<script>
    import { sceneStore, transitionStore } from '$lib/store.js';
	import { onMount } from 'svelte';

    let currentIsland = 'idle';
    let transition = null;

    $: console.log();


    onMount(() => {
            sceneStore.subscribe((value) => {
                if (value == "island-ice") {
                    setTransition();
                    currentIsland = 0;
                } else if (value == "island-desert") {
                    setTransition();
                    currentIsland = 1;
                } else if (value == "island-fire") {
                    setTransition();
                    currentIsland = 2;
                } else if (value == "island-ruins") {
                    setTransition();
                    currentIsland = 3;
                }
            });

            // transitionStore.subscribe((value) => {
            //     transition = value;
            // });
        });


    const setTransition = () => {
            transition = true;
            transitionStore.set(transition)
        }

    const changeIsland = (direction) => {

        if (currentIsland != 'idle') {
            if (direction == -1) {
                if (currentIsland == 0) {
                    currentIsland = 0;
                } else {
                    currentIsland--;
                    switch (currentIsland) {
                        case 0:
                            sceneStore.set("island-ice");
                            break;
                        case 1:
                            sceneStore.set("island-desert");
                            break;
                        case 2:
                            sceneStore.set("island-fire");
                            break;
                        case 3:
                            sceneStore.set("island-ruins");
                            break;
                    }
                }
            }
        }
        if (currentIsland != 'idle') {

            if (direction == 1) {
                if (currentIsland == 3) {
                    currentIsland = 3;
                } else {
                    currentIsland++;
                    switch (currentIsland) {
                        case 0:
                            sceneStore.set("island-ice");
                            break;
                        case 1:
                            sceneStore.set("island-desert");
                            break;
                        case 2:
                            sceneStore.set("island-fire");
                            break;
                        case 3:
                            sceneStore.set("island-ruins");
                            break;
                    }
                }
            }
        }
    }
</script>

<div class="absolute w-full top-1/2 flex justify-between items-center z-10">
    <button on:click={() => {changeIsland(-1)}} class=""><img class="w-full h-full origin-left scale-50" src="/textures/arrow-left.png" alt="Left Arrow"></button>
    <button on:click={() => {changeIsland(1)}} class=""><img class="w-full h-full origin-right scale-50" src="/textures/arrow-right.png" alt="Right Arrow"></button>
</div>