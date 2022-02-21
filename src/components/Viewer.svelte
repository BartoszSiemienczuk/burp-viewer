<script>
    import Filter from "./Filter.svelte";
    import RequestItem from "./RequestItem.svelte"; 

    export let rawItems = [];

    let requestItemComponents = [];

    const runFilter = function(filter) {
        requestItemComponents.forEach(item => item.filter(filter));
    }

    const collapseAll = function() {
        requestItemComponents.forEach(item => item.hideDetails());
    }
</script>

<div class="container">
    <div class="row">
        <table class="table table-sm table-striped table-hover">
            <thead class="table-dark">
                <Filter onFilter={runFilter} onCollapse={collapseAll}/>
                <tr>
                    <td>RQ #</td>
                    <td>Time</td>
                    <td>Method</td>
                    <td>URL</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                {#each rawItems as item, idx}
                    <RequestItem bind:this={requestItemComponents[idx]} item={item} idx={idx}/>
                {/each}
            </tbody>
            </table>
    </div>
</div>

<style>
</style>