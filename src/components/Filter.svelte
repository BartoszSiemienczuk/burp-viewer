<script>
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

    const runCollapse = () => {
      onCollapse();
    }
</script>


<tr>
    <td colspan="3">
        <input placeholder="Filter by..." class="form-control form-control-sm" type="text" bind:value={filter.text} on:input={runFilter}>
    </td>
    <td colspan="2">
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="filterUrls" bind:checked={filter.urls} on:change={runFilter}>
            <label class="form-check-label" for="filterUrls">Urls</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="filterBodies" bind:checked={filter.bodies} on:change={runFilter} disabled>
            <label class="form-check-label" for="filterBodies">Bodies</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="filterHeaders" bind:checked={filter.headers} on:change={runFilter} disabled>
            <label class="form-check-label" for="filterHeaders">Headers</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="caseSensitive" bind:checked={filter.caseSensitive} on:change={runFilter}>
            <label class="form-check-label" for="caseSensitive">Case sensitive</label>
          </div>
          <button type="button" class="float-right btn btn-primary btn-sm" on:click={runCollapse}>Collapse All</button>
    </td>
</tr>