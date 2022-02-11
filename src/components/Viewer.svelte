<script>
    import RequestItem from "./RequestItem.svelte"; 
    export let items = [];

    let filterText = '';
    let filterUrls = true;
    let filterBodies = false;
    let filterHeaders = false;
    let caseSensitive = false;

    const runFilter = function() {
        //Force items reactivity
        items = items;
    }

    const matchesFilter = function(item) {
        var filterBy = caseSensitive ? filterText : filterText.toLowerCase();
        var urlMatch = false, bodyMatch = false, headersMatch = false;
        if(!isEmpty(filterBy)) {
            var url = caseSensitive ? item.url.value : item.url.value.toLowerCase();
            if(url.includes(filterBy)) {
                urlMatch = true;
            }

            //TODO filtering by body and headers - probably need to move filtering to RequestItem component
            
            return (urlMatch && filterUrls) || (bodyMatch && filterBodies) || (headersMatch && filterHeaders);
        }
        return true;
    }

    const isEmpty = function(value) {
        if (value==null) return true;
        return value.replace(/\s/g, '').length == 0;
    }
</script>

<div class="container">
    <div class="row">
        <table class="table table-sm table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <td colspan="3">
                        <input placeholder="Filter by..." class="form-control form-control-sm" type="text" bind:value={filterText} on:input={runFilter}>
                    </td>
                    <td colspan="2">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="filterUrls" bind:checked={filterUrls} on:change={runFilter}>
                            <label class="form-check-label" for="filterUrls">Urls</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="filterBodies" bind:checked={filterBodies} on:change={runFilter} disabled>
                            <label class="form-check-label" for="filterBodies">Bodies</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="filterHeaders" bind:checked={filterHeaders} on:change={runFilter} disabled>
                            <label class="form-check-label" for="filterHeaders">Headers</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="caseSensitive" bind:checked={caseSensitive} on:change={runFilter}>
                            <label class="form-check-label" for="caseSensitive">Case sensitive</label>
                          </div>
                    </td>
                </tr>
                <tr>
                    <td>RQ #</td>
                    <td>Time</td>
                    <td>Method</td>
                    <td>URL</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                {#each items as item, idx}
                    {#if matchesFilter(item)}
                        <RequestItem item={item} idx={idx}/>
                    {/if}
                {/each}
            </tbody>
            </table>
    </div>
</div>

<style>
</style>