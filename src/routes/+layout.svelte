<script lang="ts">
    import "../app.css";
	
    import { FirebaseApp } from "sveltefire";
	import { firestore } from "$lib/firebase";
	import { onMount } from "svelte";

</script>

<FirebaseApp {firestore}>
    <slot />
</FirebaseApp>
