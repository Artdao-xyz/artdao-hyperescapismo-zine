<script>
    import { fade } from 'svelte/transition';
    import { sceneStore } from '$lib/store.js';
    import { get } from 'svelte/store';

    let currentIndex = 0;

    const artworks = [
        'artwork1', 'artwork2', 'artwork3', 'artwork4', 'artwork5',
        'artwork6', 'artwork7', 'artwork8', 'artwork9', 'artwork10',
        'artwork11', 'artwork12', 'artwork13', 'artwork14', 'artwork15',
        'artwork16', 'artwork17', 'artwork18', 'artwork19', 'artwork20'
    ];

    const getArtworkRange = (index) => {
        if (index >= 0 && index < 5) return [0, 4];
        if (index >= 5 && index < 10) return [5, 9];
        if (index >= 10 && index < 15) return [10, 14];
        if (index >= 15 && index < 20) return [15, 19];
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

    // Reactive statement to update currentIndex based on sceneStore
    $: {
        const currentArtwork = $sceneStore;
        currentIndex = artworks.indexOf(currentArtwork);
    }

</script>

{#if $sceneStore.startsWith('artwork')}
    <div in:fade={{ delay: 2000 , duration: 1000 }} class="absolute w-full top-1/2 px-4 flex justify-between items-center z-10">
        <button on:click|stopPropagation={moveLeft}><img draggable="false" class="outline-none w-full h-full origin-left scale-200" src="/arrow-left.png" alt="Left Arrow"></button>
        <button on:click|stopPropagation={moveRight}><img draggable="false" class="outline-none w-full h-full origin-right scale-200" src="/arrow-right.png" alt="Right Arrow"></button>
    </div>
{/if}
