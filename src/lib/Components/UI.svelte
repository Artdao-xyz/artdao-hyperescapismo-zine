<script>
    import { sceneStore, transitionStore } from '$lib/store.js';
	import { onMount } from 'svelte';

    let transition = null;
    let currentScene = null;
    let currentIndex = null;

    let artworks = ["artwork1", "artwork2", "artwork3", "artwork4", "artwork5"];
    let scenes = ["island-ice", "island-desert", "island-fire", "island-ruins"];
    let lastIsland = null

    let menuButton, islandButton;

    $: isIdle = $sceneStore === 'idle'; // computed variable to check if the scene is idle
    $: isIsland = ['island-fire', 'island-ruins', 'island-ice', 'island-desert', 'idle'].includes($sceneStore);

    const setTransition = () => {
        transition = true;
        transitionStore.set(transition)
    }

    onMount(() => {
        sceneStore.subscribe((value) => {
            const artworkIndexes = {
                'artwork1': 0, 'artwork2': 1, 'artwork3': 2, 'artwork4': 3, 'artwork5': 4,
                'artwork6': 0, 'artwork7': 1, 'artwork8': 2, 'artwork9': 3, 'artwork10': 4,
                'artwork11': 0, 'artwork12': 1, 'artwork13': 2, 'artwork14': 3, 'artwork15': 4,
                'artwork16': 0, 'artwork17': 1, 'artwork18': 2, 'artwork19': 3, 'artwork20': 4,
                'island-ice': 0, 'island-desert': 1, 'island-fire': 2, 'island-ruins': 3,
            };

            currentScene = value;
            currentIndex = artworkIndexes[value] || 0;

            if (value.startsWith('island-')) {
                lastIsland = value;
            }
        });
    });

    const moveLeft = () => {

        if (currentScene != 'idle') {
            
            if (currentScene == 'island-ice' || currentScene == 'island-desert' || currentScene == 'island-fire' || currentScene == 'island-ruins') { 
                
                
                currentIndex = currentIndex > 0 ? currentIndex - 1 : 0;
                if (currentIndex == 0) {
                    sceneStore.set("island-ice");
                } else if (currentIndex == 1) {
                    sceneStore.set("island-desert");
                } else if (currentIndex == 2) {
                    sceneStore.set("island-fire");
                } else if (currentIndex == 3) {
                    sceneStore.set("island-ruins");
                }
                lastIsland = currentScene;
                setTransition();

            }
            else {
                currentIndex = (currentIndex - 1 + artworks.length) % artworks.length;

                if (lastIsland == 'island-fire') {
                    console.log(`currentIndex: ${currentIndex}`);
                    if (currentIndex == 0) {
                        sceneStore.set("artwork1");
                    } else if (currentIndex == 1) {
                        sceneStore.set("artwork2");
                    } else if (currentIndex == 2) {
                        sceneStore.set("artwork3");
                    } else if (currentIndex == 3) {
                        sceneStore.set("artwork4");
                    } else if (currentIndex == 4) {
                        sceneStore.set("artwork5");
                    }                
                } else if (lastIsland == 'island-ice') {
                    console.log(`currentIndex: ${currentIndex}`);
                    if (currentIndex == 0) {
                        sceneStore.set("artwork6");
                    } else if (currentIndex == 1) {
                        sceneStore.set("artwork7");
                    } else if (currentIndex == 2) {
                        sceneStore.set("artwork8");
                    } else if (currentIndex == 3) {
                        sceneStore.set("artwork9");
                    } else if (currentIndex == 4) {
                        sceneStore.set("artwork10");
                    }                
                } else if (lastIsland == 'island-desert') {
                    console.log(`currentIndex: ${currentIndex}`);
                    if (currentIndex == 0) {
                        sceneStore.set("artwork11");
                    } else if (currentIndex == 1) {
                        sceneStore.set("artwork12");
                    } else if (currentIndex == 2) {
                        sceneStore.set("artwork13");
                    } else if (currentIndex == 3) {
                        sceneStore.set("artwork14");
                    } else if (currentIndex == 4) {
                        sceneStore.set("artwork15");
                    }                
                } else if (lastIsland == 'island-ruins') {
                    console.log(`currentIndex: ${currentIndex}`);
                    if (currentIndex == 0) {
                        sceneStore.set("artwork16");
                    } else if (currentIndex == 1) {
                        sceneStore.set("artwork17");
                    } else if (currentIndex == 2) {
                        sceneStore.set("artwork18");
                    } else if (currentIndex == 3) {
                        sceneStore.set("artwork19");
                    } else if (currentIndex == 4) {
                        sceneStore.set("artwork20");
                    }                
                }

            } 
        }
        else {
            //disable menu button
        }

    }
    const moveRight = () => {
    
        if (currentScene != 'idle') {
            if (currentScene == 'island-ice' || currentScene == 'island-desert' || currentScene == 'island-fire' || currentScene == 'island-ruins') {


                currentIndex = currentIndex < scenes.length - 1 ? currentIndex + 1 : scenes.length - 1;
                if (currentIndex == 0) {
                    sceneStore.set("island-ice");
                } else if (currentIndex == 1) {
                    sceneStore.set("island-desert");
                } else if (currentIndex == 2) {
                    sceneStore.set("island-fire");
                } else if (currentIndex == 3) {
                    sceneStore.set("island-ruins");
                }
                lastIsland = currentScene;
                setTransition();

            }
            else {
                currentIndex = (currentIndex + 1) % artworks.length;
                
                if (lastIsland == 'island-fire') {
                    console.log(`currentIndex: ${currentIndex}`);
                    if (currentIndex == 0) {
                        sceneStore.set("artwork1");
                    } else if (currentIndex == 1) {
                        sceneStore.set("artwork2");
                    } else if (currentIndex == 2) {
                        sceneStore.set("artwork3");
                    } else if (currentIndex == 3) {
                        sceneStore.set("artwork4");
                    } else if (currentIndex == 4) {
                        sceneStore.set("artwork5");
                    }                
                } else if (lastIsland == 'island-ice') {
                    console.log(`currentIndex: ${currentIndex}`);
                    if (currentIndex == 0) {
                        sceneStore.set("artwork6");
                    } else if (currentIndex == 1) {
                        sceneStore.set("artwork7");
                    } else if (currentIndex == 2) {
                        sceneStore.set("artwork8");
                    } else if (currentIndex == 3) {
                        sceneStore.set("artwork9");
                    } else if (currentIndex == 4) {
                        sceneStore.set("artwork10");
                    }                
                } else if (lastIsland == 'island-desert') {
                    console.log(`currentIndex: ${currentIndex}`);
                    if (currentIndex == 0) {
                        sceneStore.set("artwork11");
                    } else if (currentIndex == 1) {
                        sceneStore.set("artwork12");
                    } else if (currentIndex == 2) {
                        sceneStore.set("artwork13");
                    } else if (currentIndex == 3) {
                        sceneStore.set("artwork14");
                    } else if (currentIndex == 4) {
                        sceneStore.set("artwork15");
                    }                
                } else if (lastIsland == 'island-ruins') {
                    console.log(`currentIndex: ${currentIndex}`);
                    if (currentIndex == 0) {
                        sceneStore.set("artwork16");
                    } else if (currentIndex == 1) {
                        sceneStore.set("artwork17");
                    } else if (currentIndex == 2) {
                        sceneStore.set("artwork18");
                    } else if (currentIndex == 3) {
                        sceneStore.set("artwork19");
                    } else if (currentIndex == 4) {
                        sceneStore.set("artwork20");
                    }                
                }
            } 
        }
       
    }    
</script>

<div class="absolute top-0 left-1/2 -translate-x-1/2 flex z-10 gap-20 p-4">
    <button disabled={isIdle} bind:this={menuButton} on:click={ () => sceneStore.set("idle") } class="{ isIdle ? 'text-gray-500 bg-gray-200' : 'text-black bg-white'} text-xs rounded-3xl px-4 py-1" >Go to Menu</button>
    <button disabled={isIsland} bind:this={islandButton} on:click={ () => sceneStore.set(lastIsland) }  class="{ isIsland ? 'text-gray-500 bg-gray-200' : 'text-black bg-white'} text-xs rounded-3xl px-4 py-1" >Go to Island</button>
</div>

<div class="absolute w-full top-1/2 flex justify-between items-center z-10">
    <button on:click={moveLeft}><img  class="w-full h-full origin-left scale-200" src="/textures/arrow-left.png" alt="Left Arrow"></button>
    <button on:click={moveRight}><img class="w-full h-full origin-right scale-200" src="/textures/arrow-right.png" alt="Right Arrow"></button>
</div>