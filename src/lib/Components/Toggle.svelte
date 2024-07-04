<script>
    let isChecked = true;
</script>
<label class="absolute bottom-1 right-2 md:relative md:bottom-0 md:right-0 flex justify-between items-center p-2 text-xl cursor-pointer">
    <input type="checkbox" on:click|stopPropagation bind:checked={isChecked} class="absolute left-0 w-full h-full peer appearance-none rounded-md cursor-pointer"/>
    <span class="w-16 h-9 flex items-center flex-shrink-0 p-1 bg-transparent rounded-full duration-400 ease-in-out after:w-7 after:h-7  peer-checked:bg-white peer-checked:bg-opacity-25 after:bg-white after:rounded-full after:duration-200 peer-checked:after:translate-x-6 border-2 border-white peer/switch shadow-white shadow-cloud"></span>
    
    <div class="hidden md:block absolute top-16 right-2 w-[200px] bg-black bg-opacity-25 text-center text-white text-xs font-normal font-monda tracking-wide p-2.5 invisible peer-checked:peer-hover/switch:visible">
        <div class="absolute -top-2 right-3 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-black border-opacity-25"></div>
        <span>switch to marketplace view</span>
    </div>
</label>