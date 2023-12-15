<script lang="ts">
    const T = Date.parse('01 Jul 2024 00:00:00 GMT').valueOf();

    let now = Date.now();

    setInterval(() => {
        now = Date.now();
    }, 100)

    let diff, secs, mins, hours, days;

    $: {
        diff = T - now;
        secs = Math.floor(diff/1000);
        mins = Math.floor(diff/1000/60);
        hours= Math.floor(diff/1000/60/60);
        days = Math.floor(diff/1000/60/60/24);
    }

</script>
<div class="text-[20vmin] h-screen flex items-center justify-center flex-col">
    <div class="m-10">
        {days} days 
    </div>
    <div class="text-[10vmin] m-10">until comp</div>
</div>