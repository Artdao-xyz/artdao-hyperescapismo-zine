<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { transitionStore } from '$lib/store.js';

	let div1, div2;

	onMount(() => {
		/* FIRST OPTION */
		// gsap.to([div1], { duration: 0.5, xPercent: -80, yPercent: +75, ease: 'power2.inOut' });
		// gsap.to([div2], { duration: 0.5, xPercent: +80, yPercent: -75, ease: 'power2.inOut' });

		// gsap.delayedCall(1.5, () => {
		//     gsap.to([div1], { duration: 0.5, xPercent: -0, yPercent: +0, ease: 'power2.inOut' });
		//     gsap.to([div2], { duration: 0.5, xPercent: +0, yPercent: -0, ease: 'power2.inOut' ,
		//     onComplete: () => { transitionStore.set(false) }});
		// });

		/* SECOND OPTION */
		gsap.to([div1], { duration: 0.5, xPercent: -100, ease: 'power2.inOut' });
		gsap.to([div2], { duration: 0.5, xPercent: +100, ease: 'power2.inOut' });

		gsap.delayedCall(1.5, () => {
			gsap.to([div1], { duration: 0.5, xPercent: 0, ease: 'power2.inOut' });
			gsap.to([div2], {
				duration: 0.5,
				xPercent: 0,
				ease: 'power2.inOut',
				onComplete: () => {
					transitionStore.set(false);
				}
			});
		});
	});
</script>

<!-- <div bind:this={div1} class="absolute -top-full scale-[150%] left-full w-full h-full">
    <img class="w-full h-full" src="/textures/cloud-transition2.png" alt="">
</div>

<div bind:this={div2} class="absolute top-full scale-[150%] -left-full w-full h-full">
    <img class="w-full h-full" src="/textures/cloud-transition2.png" alt="">
</div> -->

<div bind:this={div1} class="absolute top-0 left-full w-full h-full z-20">
	<img class="w-full h-full" src="/textures/transition-right.png" alt="" />
</div>

<div bind:this={div2} class="absolute top-0 -left-full w-full h-full z-20">
	<img class="w-full h-full" src="/textures/transition-left.png" alt="" />
</div>
