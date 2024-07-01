<script>
    export let progress;
  
    let progressBar
    let progressBarContainer
    let enter = false;
    
    $: {
      if (progressBar) {
        progressBar.value = progress;

        // if (progress == 100) {
        if (progress == 100 && enter) {
            //make a delay of two seconds to show the progress bar at 100%
            // console.log('ready')
            setTimeout(() => {
                progressBarContainer.style.display = 'none';
            }, 1000);
        }
      }
    }
  </script>
  
  <!-- Loading Bar -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click|stopPropagation bind:this={progressBarContainer} class="cursor-default bg-white text-white font-monda fixed inset-0 flex justify-center items-center z-50 bg-cover bg-center" style="background-image: url('/bg-lore.png');">
    <div class="relative w-fit h-screen flex flex-col justify-center items-center ">
        <img class="max-w-full h-auto max-h-full" src="/lore.png" alt="Lore">
        <div class="absolute inset-0 flex flex-col justify-center items-center px-24 xl:px-28 gap-4 ">
            <img src="/logo-hyperescapismo.svg" alt="Hyperescapismo">
            <p class="text-center text-sm xl:text-base">
                O ArtDAO tem trabalhado nos últimos meses em nossa própria infraestrutura de mercado na plataforma Fuel, uma nova Layer-2 que se expande a partir do Ethereum. Acreditamos que isso oferece uma nova e poderosa oportunidade para ampliar as possibilidades da arte digital no Ethereum.
            </p>
            <div class="w-fit text-center">
              <hr class="outline-[1px]">
              <div class="flex items-center gap-3 group">
                <img class="invisible group-hover:visible" src="/enter.svg" alt="enter the game">
                <button on:click|stopPropagation={()=>{ enter = true} } class="font-garamond  py-1 tracking-wide">ENTER THE WORLD</button>
                <img class="invisible group-hover:visible rotate-180" src="/enter.svg" alt="enter the game">
              </div>
              <hr class="outline-[1px]">
            </div>
        </div>
    </div>
    <progress bind:this={progressBar} class="custom-progress-bar absolute bottom-0 w-full h-2" value="{progress}" max="100"></progress>
</div>



<style>
  /* Custom styles for progress bar */
  progress.custom-progress-bar::-webkit-progress-bar {
      background-color: #7e7e7e;
  }

  progress.custom-progress-bar::-webkit-progress-value {
      background-color: #000000;
  }

  progress.custom-progress-bar::-moz-progress-bar {
      background-color: #000000;
  }

  progress.custom-progress-bar::-ms-fill {
      background-color: #000000;
  }

</style>