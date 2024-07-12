<script>
	import '/src/style.css';
	import { onMount } from 'svelte';
	import Experience from '$lib/Experience/Experience.js';
	import Loading from '../lib/Components/Loading.svelte';
	import { loadingStore } from '$lib/store.js';
	import UserInterface from '$lib/Components/UserInterface.svelte';

	let canvas;

	onMount(() => {
		const experience = new Experience(canvas);

		return () => {
			experience.destroy();
			canvas.remove();
		};
	});
</script>

<Loading progress={$loadingStore} />
<UserInterface />
<canvas bind:this={canvas}></canvas>
