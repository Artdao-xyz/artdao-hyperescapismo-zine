<script>
    export let progress;
  
    let progressBar
    let progressBarContainer
    
    $: {
      if (progressBar) {
        progressBar.value = progress;

        if (progress == 100) {
            //make a delay of two seconds to show the progress bar at 100%
            setTimeout(() => {
                progressBarContainer.style.display = 'none';
            }, 1000);
        }
      }
    }
  </script>
  
  <!-- Loading Bar -->
<div bind:this={progressBarContainer} class="bg-white absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center gap-4 z-20">
<label class="text-black font-clash-display text-2xl h-[3%]" for={progressBar}>Loading...</label>
<progress bind:this={progressBar} class="custom-progress-bar w-1/3 h-[0.5%] mt-1 bg-black @apply(-webkit-progress-value-bg-black)" value="{progress}" max="100"></progress>
</div>

  