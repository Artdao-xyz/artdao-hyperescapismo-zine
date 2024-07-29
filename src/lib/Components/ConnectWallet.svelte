<script>
	let isConnected = false;
	let walletAddress = '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e';

	const toggleConnection = () => {
		isConnected = !isConnected;
	};
</script>

<div class="absolute top-8 right-4 md:relative md:top-0 md:right-0">
	{#if isConnected}
		<button
			class="relative font-monda bg-white bg-opacity-10 rounded-full px-3 py-2 uppercase text-white shadow-md border-[3px] border-white transition-all duration-200 ease-in-out box-border max-w-28 h-10"
			on:click|stopPropagation={toggleConnection}
		>
			<div class="flex items-center gap-2 h-full">
				<img src="/user.svg" alt="wallet" />
				<span class="text-xs md:text-sm truncate">{walletAddress}</span>
			</div>
		</button>
	{:else}
		<button
			class="relative font-monda bg-white bg-opacity-10 rounded-full py-1.5 px-6 uppercase text-white text-sm md:text-base shadow-md border-[3px] border-transparent hover:border-white transition-all duration-200 ease-in-out box-border h-10 tracking-wide"
			on:click|stopPropagation={toggleConnection}
		>
			connect
		</button>
	{/if}
</div>
