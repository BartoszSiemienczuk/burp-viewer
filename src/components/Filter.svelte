<script>
    import {
        Toolbar,
        ToolbarContent,
        ToolbarSearch,
        Button,
    } from "carbon-components-svelte";
    import FilterReset24 from "carbon-icons-svelte/lib/FilterReset24"
    export let onFilter = (filter) => {};
    export let onCollapse = () => {};

    let filter = {
        text: '',
        urls: true,
        bodies: false,
        headers: false,
        caseSensitive: false
    }

    const runFilter = () => {
      onFilter(filter);
    }

    const clearFilter = () => {
      filter.text = '';
      onFilter(filter);
    }

    const runCollapse = () => {
      onCollapse();
    }
</script>

<Toolbar>
  <ToolbarContent>
    <ToolbarSearch expanded={true} persistent={true} bind:value={filter.text} on:input={runFilter}/>
    <Button kind="danger" on:click={clearFilter} icon={FilterReset24} hasIconOnly={true} iconDescription="Reset Filters"></Button>
  </ToolbarContent>
</Toolbar>