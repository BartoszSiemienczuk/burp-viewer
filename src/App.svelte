<script lang="ts">
	import Navbar from './components/Navbar.svelte';
	import Viewer from './components/Viewer.svelte';

	let items = [];

	const onItemsLoaded = function (result) {
		items = result;
	}
</script>	

<main>
	<Navbar {onItemsLoaded}/>
	<Viewer rawItems={items}/>
</main>