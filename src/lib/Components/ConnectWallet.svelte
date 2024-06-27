<script>
    let isConnected = false;
    let walletAddress = '';

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

{#if isConnected}
<button class="relative w-28" on:click|stopPropagation={toggleConnection}>
    <img src="/connected.png" alt="connected wallet" class="w-full h-full">
    <span class="font-monda font-bold text-black text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 w-full px-4">
        <img src="/user.svg" alt="icon"> <!-- Adjust the image source and size as needed -->
        <span class="truncate">{walletAddress}</span>
    </span>
</button>
{:else}
    <button class="w-28" on:click={toggleConnection}>
        <img src="/connect.png" alt="connect wallet" >
    </button>
{/if}