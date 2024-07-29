<script>
	import { fade } from 'svelte/transition';
	import { sceneStore } from '$lib/store.js';

	let bids = [
		{ id: 1, amount: '0.69 ETH', bidder: 'Vitalik.eth' },
		{ id: 2, amount: '0.75 ETH', bidder: 'Alice.eth' },
		{ id: 3, amount: '0.80 ETH', bidder: 'Bob.eth' },
		{ id: 4, amount: '0.72 ETH', bidder: 'Charlie.eth' },
		// Add more bids as needed
	];

	const scenes = ['island-desert', 'island-ice', 'island-ruins', 'island-fire'];
	let lastValidScene = '';
	let isArtworkSelected = true;

	const artworkGroups = [
		{ range: [1, 5], scene: 'island-fire' },
		{ range: [6, 10], scene: 'island-ice' },
		{ range: [11, 15], scene: 'island-desert' },
		{ range: [16, 20], scene: 'island-ruins' }
	];

	const getSceneFromArtwork = (artworkId) => {
		const artworkNum = parseInt(artworkId.replace('artwork', ''), 10);
		const group = artworkGroups.find(
			(group) => artworkNum >= group.range[0] && artworkNum <= group.range[1]
		);
		return group ? group.scene : '';
	};

	$: {
		if (scenes.includes($sceneStore)) {
			lastValidScene = $sceneStore;
		} else if ($sceneStore.startsWith('artwork')) {
			lastValidScene = getSceneFromArtwork($sceneStore);
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if $sceneStore.startsWith('artwork')}
	<!-- <div
		in:fade={{ delay: 2000, duration: 1000 }}
		on:click|stopPropagation
		class="select-none cursor-default absolute right-1/2 translate-x-1/2 md:-translate-x-0 md:right-4 bottom-16 md:bottom-4 w-full md:w-auto px-7 md:px-0 font-monda text-white text-center"
	>
		<img draggable="false" class="hidden md:block" src="/bidding-info.png" alt="artwork bidding" />
		<img
			draggable="false"
			class="md:hidden w-full"
			src="/bidding-info-mobile.png"
			alt="artwork bidding"
		/>

		<div
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex md:flex-col items-center gap-3 px-10 md:px-16 py-5 w-full"
		>
			<div
				class="flex flex-col md:flex-row items-start justify-between text-[10px] capitalize tracking-wide md:gap-3"
			>
				<span class="hidden md:block">open auction</span>
				<span class="md:hidden">last bid</span>
				<span class="text-nowrap">2d 23h 12m</span>
			</div>
			<div class="relative flex items-center gap-1 md:text-lg tracking-wide">
				<input
					class="text-white bg-transparent w-full pl-2 h-10 rounded border border-slate-200 focus:border-2 focus:border-white outline-none"
					type="number"
					required
					placeholder="1.0"
				/><span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm opacity-50">ETH</span>
			</div>

			<div
				class="hidden md:block h-8 text-[10px] tracking-tight leading-none border-t border-white space-y-1.5 overflow-y-auto"
			>
				{#each bids as bid}
					<div class="">
						{bid.amount} bid by {bid.bidder}
					</div>
				{/each}
			</div>

			<button class=""><img draggable="false" src="/bid.png" alt="bid" /></button>
		</div>
	</div> -->
	
	<div in:fade={{ delay: 2000, duration: 1000 }} class="flex select-none cursor-default relative md:absolute md:-translate-x-0 md:right-4 md:bottom-4 w-full md:w-auto font-monda text-white capitalize tracking-wide px-4 md:px-0">
		
		<img draggable="false" class="hidden md:block" src="/artwork-info.png" alt="artwork bidding" />
		<img draggable="false" class="md:hidden w-full" src="/bidding-info-mobile.png" alt="artwork bidding"/>

		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full p-8 flex md:flex-col items-center gap-6">
			<div class="flex gap-4 h-full">
				<div class="relative flex md:flex-col justify-between gap-2 w-full md:w-1/2">

					<span class="hidden md:block text-xs">your offer</span>
					<div class="relative">
						<input class="md:text-xl bg-white bg-opacity-5 px-1 w-full outline-none border-2 border-transparent focus:border-white" placeholder="1.0" type="number">
						<span class="uppercase opacity-50 absolute right-2 top-1/2 -translate-y-1/2">eth</span>
					</div>
						
					<div class="hidden md:flex opacity-50 items-center justify-between text-xs"><span class="">$3154</span><span class="">min bid: 0.10 ETH</span></div>
				</div>

				<div class="relative hidden md:flex flex-col justify-between text-xs text-nowrap">
					<div class="flex items-center gap-2">
						<img src="/offer.png" alt="offer">
						<span class="text-slate-300">open auction</span>
					</div>
					<span class="text-slate-300">
						2d 23h 12m
					</span>
					<span class="hidden md:block leading-none">
						{bids[0].amount} bid by {bids[0].bidder}
					</span>
				</div>
			</div>
			<button class="text-xs md:text-sm uppercase md:rounded-full border-2 border-white self-center px-3.5 md:px-5 py-1.5 md:py-2.5 bg-white bg-opacity-10 leading-none hover:bg-opacity-20 whitespace-nowrap w-1/3 md:w-full">make offer</button>

		</div>
	</div>
{/if}

<style>
	/* Hide arrows in Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}

	/* Hide arrows in Chrome, Safari, Edge, Opera */
	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
