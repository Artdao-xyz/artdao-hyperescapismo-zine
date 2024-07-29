<script>
    import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
    export let inactivityPeriod = 5000;
    let inactivityTimeout;
    let activityTimeout;
    let showDragScreen = false;

    function resetInactivityTimeout() {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        showDragScreen = true
      }, inactivityPeriod);
    }
  
    function handleMouseMove() {
        clearTimeout(inactivityTimeout);
        activityTimeout = setTimeout(() => {
            showDragScreen = false;
        }, 1000);   
        resetInactivityTimeout();
    }
  
    onMount(() => {
      window.addEventListener('mousemove', handleMouseMove);
      resetInactivityTimeout();
    });
  
    onDestroy(() => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(inactivityTimeout);
      clearTimeout(activityTimeout);
    });
  </script>
   
{#if showDragScreen}
    <div
        in:fade={{ delay: 2000, duration: 1000 }}
        class="select-none absolute left-1/2 -translate-x-1/2 top-1/2 text-white text-sm font-monda tracking-wide text-nowrap drop-shadow-cloud"
    >
        <slot></slot>
    </div>
{/if}