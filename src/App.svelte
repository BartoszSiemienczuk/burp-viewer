<script lang="ts">
	import Navbar from './components/Navbar.svelte';
	import Viewer from './components/Viewer.svelte';

	let items = [];

	const onItemsLoaded = function (result) {
		console.log("Items are loaded");
		items = result;
		console.log(items);
	}
</script>	

<main>
	<Navbar {onItemsLoaded}/>
	<Viewer {items}/>
</main>