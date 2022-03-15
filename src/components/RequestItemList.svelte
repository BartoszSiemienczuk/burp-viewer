<script>
    import { TooltipIcon, DataTable, Pagination, TooltipDefinition } from "carbon-components-svelte";
    import Filter from "./Filter.svelte";
    import Copy16 from "carbon-icons-svelte/lib/Copy16";
    import { matchesFilter } from "../utils/request-item-utils";
    export let requestItems = [];
    export let onItemSelect = (item) => {};

    let tableRows = [];
    let selectedRows = [0];
    let pagination = {
        pageSizes: [5, 10, 20, 50, 100],
        pageSize: 20,
        page: 1
    }
    let currentFilter = {
        text: '',
        urls: true,
        bodies: false,
        headers: false,
        caseSensitive: false
    }

    const runFilter = function(filter) {
        currentFilter = filter;
    }

    const selectItem = function(itemIndex) {
        onItemSelect(requestItems[itemIndex]);
    }

    const copyUrl = function(url) {
        navigator.clipboard.writeText(url);
    }

    $: {
        tableRows = requestItems
        .filter(item => matchesFilter(currentFilter, item.raw))
        .map((item, idx) => {
            return {
                id: idx,
                time: new Date(item.raw.time.value),
                method: item.raw.method.value,
                url: item.raw.url.value,
                status: item.raw.status.value
            };
        });
        selectItem(selectedRows[0]);
    }
</script>

<DataTable radio bind:selectedRowIds={selectedRows} sortable size="compact" rows={tableRows} pageSize={pagination.pageSize} page={pagination.page}
  headers={[
    { key: "id", value: "RQ#" },
    { key: "time", value: "Time" },
    { key: "method", value: "Method" },
    { key: "url", value: "URL" },
    { key: "status", value: "Status" }
  ]}
>
  <svelte:fragment slot="cell" let:row let:cell>
    {#if cell.key === "url"}
        <TooltipIcon tooltipText="Copy URL" direction="left" size="sm" icon={Copy16} on:click={() => copyUrl(cell.value)}/>
        <TooltipDefinition tooltipText={cell.value}>
            {cell.value.substring(0, 80)}{#if cell.value.length>80}...{/if}
        </TooltipDefinition> 
    {:else if cell.key === "time"}
        {cell.value.toLocaleString()}
    {:else}
      {cell.value}
    {/if}
  </svelte:fragment>

  <Filter onFilter={runFilter}/>
</DataTable>

{#if tableRows.length > 1}
    <Pagination
    bind:pageSize={pagination.pageSize}
    bind:page={pagination.page}
    bind:pageSizes={pagination.pageSizes}
    totalItems={tableRows.length}
    />
{/if}