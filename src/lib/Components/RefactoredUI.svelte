<script>
    import { onDestroy, onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { sceneStore } from '$lib/store.js';

    let currentScene = 'idle';
    let currentIndex = 0;
    let lastIsland = '';
    let unsubscribe = null;
    let isConnected = false;
    let walletAddress = '';

    const scenes = ['island-fire', 'island-ruins', 'island-ice', 'island-desert'];

    const artworks = [
        'artwork1', 'artwork2', 'artwork3', 'artwork4', 'artwork5',
        'artwork6', 'artwork7', 'artwork8', 'artwork9', 'artwork10',
        'artwork11', 'artwork12', 'artwork13', 'artwork14', 'artwork15',
        'artwork16', 'artwork17', 'artwork18', 'artwork19', 'artwork20'
    ];

    onMount(() => {

        unsubscribe = sceneStore.subscribe(value => {
            currentScene = value;
            updateCurrentIndex();
        })
    })
    
    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });

    const getArtworkRange = (index) => {
        if (index >= 0 && index < 5) return [0, 4];
        if (index >= 5 && index < 10) return [5, 9];
        if (index >= 10 && index < 15) return [10, 14];
        if (index >= 15 && index < 20) return [15, 19];
        return [0, 4]; // Default to the first range
    };

    const updateCurrentIndex = () => {
        currentIndex = artworks.indexOf(currentScene);
        const [start, end] = getArtworkRange(currentIndex);
        currentIndex = currentIndex === -1 ? start : currentIndex;
        lastIsland = artworks[start];
    };
    
    const moveRight = () => {
        const [start, end] = getArtworkRange(currentIndex);
        currentIndex = (currentIndex + 1 > end) ? start : currentIndex + 1;
        sceneStore.set(artworks[currentIndex]);
    };

    const moveLeft = () => {
        const [start, end] = getArtworkRange(currentIndex);
        currentIndex = (currentIndex - 1 < start) ? end : currentIndex - 1;
        sceneStore.set(artworks[currentIndex]);
    };

    const setScene = scene => {
        sceneStore.set(scene);
    }

    const toggleConnection = () => {
        if (isConnected) {
            isConnected = false;
            walletAddress = '';
        } else {
            isConnected = true;
            walletAddress = '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e'; // Replace with actual wallet address
        }
    }
</script>

<!-- ISLAND CONTROLS -->
<div transition:fade={{ duration: 300 }} class="absolute left-4 top-4 flex items-center justify-between">
    {#each scenes as scene}
        <button
            class="{ $sceneStore === scene ? '' : 'brightness-0' }"
            on:click|stopPropagation={setScene.bind(null, scene)}
            >
            <img src={`/${scene}.png`} alt={`island ${scene}`} />
        </button>
    {/each}
</div>

<!-- LOGO -->
{#if !currentScene.startsWith('artwork')}
    <button  class="absolute top-0 left-1/2 -translate-x-1/2" on:click|stopPropagation={ () => sceneStore.set('idle') } ><img class="" src="/logo-hyperescapismo.png" alt="Hyperescapismo">
    </button>
{:else}
    <div></div>
{/if}

<!-- CONNECT BUTTON -->
<div transition:fade={{ duration: 300 }} class="absolute right-4 top-4">
    {#if isConnected}
    <button on:click|stopPropagation={toggleConnection} class="relative">
        <img src="/connected.png" alt="connected wallet" class="w-full h-full">
        <span class="font-monda font-bold text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 w-full px-4">
            <img src="/user.svg" alt="icon"> <!-- Adjust the image source and size as needed -->
            <span class="truncate">{walletAddress}</span>
        </span>
    </button>
    {:else}
        <button on:click={toggleConnection}>
            <img src="/connect.png" alt="connect wallet" class="w-full h-full">
        </button>
    {/if}
</div>

<!-- RIGHT|LEFT BUTTONS -->
{#if currentScene.startsWith('artwork')}
    <div transition:fade={{ duration: 300 }} class="absolute w-full top-1/2 px-4 flex justify-between items-center z-10">
        <button on:click|stopPropagation={moveLeft}><img draggable="false" class="outline-none w-full h-full origin-left scale-200" src="/arrow-left.png" alt="Left Arrow"></button>
        <button on:click|stopPropagation={moveRight}><img draggable="false" class="outline-none w-full h-full origin-right scale-200" src="/arrow-right.png" alt="Right Arrow"></button>
    </div>
{/if}