<script lang="ts">
	import "carbon-components-svelte/css/all.css";
	import Navbar from './components/Navbar.svelte';
	import { Content, Grid, Row, Column } from 'carbon-components-svelte';
	import RequestItemList from "./components/RequestItemList.svelte";
	import RequestItemDetails from "./components/RequestItemDetails.svelte";

	let items = [];
	let selectedItem = undefined;

	const onItemsLoaded = function (result) {
		items = result;
	}

	const onItemSelect = function (item) {
		selectedItem = item;
		console.log("Selected item = ", selectedItem);
	}
</script>	

<main style="padding: 0;">
	<Navbar {onItemsLoaded}/>
	<Content>
		<Grid fullWidth padding={false}>
			<Row>
				<Column>
					<RequestItemList requestItems={items} onItemSelect={onItemSelect}/>
				</Column>
			</Row>
			<Row>
				<Column>
					{#if selectedItem}
						<RequestItemDetails item={selectedItem}/>
					{/if}
				</Column>
			</Row>
		</Grid>
	</Content>
</main>