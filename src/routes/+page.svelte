<script lang="ts">
    import { Collection, Doc } from "sveltefire";

    const T = Date.parse('17 Jul 2024 05:00:00 GMT').valueOf();

    let now = Date.now();

    setInterval(() => {
        now = Date.now();
    }, 100)

    let diff, secs, mins, hours, days;

    $: {
        diff = T - now;
        days = Math.floor(diff/1000/60/60/24);
        diff = diff - days*1000*60*60*24;
        hours= Math.floor(diff/1000/60/60);        
        diff = diff - hours*1000*60*60;
        mins = Math.floor(diff/1000/60);
        diff = diff - mins*1000*60;
        secs = Math.floor(diff/1000);
    }

</script>

<div class="text-[16vmin] h-screen flex items-center justify-center flex-col">
    <div>
        {days}
        <span class="text-[8vmin]">D</span>
        {hours}
        <span class="text-[8vmin]">h</span>
        {mins}
        <span class="text-[8vmin]">m</span>
        {secs}
        <span class="text-[8vmin]">s</span>
    </div>

    <!-- JUST TO TEST UNTIL WE HAVE DATE: -->
    <div class="text-[8vmin]">until your dad comes home from getting milk.</div>
    
    
    <!--<div class="text-[4vmin] mt-[20vh]">bad things Joao said: 
        <Doc ref="data/joao" let:data={joao}>{joao.count}</Doc>
    </div>-->
</div>
