<script lang="ts">
    import { Collection, Doc } from "sveltefire";

    const T = Date.parse('07 Jul 2024 00:00:00 GMT').valueOf();

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

<div class="text-[20vmin] h-screen flex items-center justify-center flex-col">
    <div>
        {days}
        <span class="text-[10vmin]">D</span>
        {hours}
        <span class="text-[10vmin]">h</span>
        {mins}
        <span class="text-[10vmin]">m</span>
        {secs}
        <span class="text-[10vmin]">s</span>
    </div>
    <div class="text-[10vmin]">until comp</div>
    <div class="text-[5vmin] mt-[20vh]">bad things Joao said: 
        <Doc ref="data/joao" let:data={joao}>{joao.count}</Doc>
    </div>
</div>