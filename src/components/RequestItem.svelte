<script>
    import { matchesFilter } from "../utils/request-item-utils";
    export let item;
    export let idx;

    let showDetails = false;
    let hidden = false;

    export const hideDetails = () => {
        showDetails = false;
    }

    export const filter = (filter) => {
        hidden = !matchesFilter(filter, item.raw);
    }

    const prettyJson = (content) => {
        try {
            return JSON.stringify(JSON.parse(content),null,2)
        } catch (error) {
            return content;
        }
    }
</script>

{#if !hidden}
    <tr id="item-row-main-{idx}" on:click={() => {showDetails = !showDetails}}>
        <td class="id-column">&#35;{idx}</td>
        <td class="time-column">{item.raw.time.value}</td>
        <td class="method-column">{item.raw.method.value}</td>
        <td class="url-column">{item.raw.url.value}</td>
        <td class="status-column">{item.raw.status.value}</td>
    </tr>
    {#if showDetails}
    <tr id="item-row-details-{idx}">
        <td colspan="5">
            <div class="accordion" id="details-accordion-{idx}">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#details-accordion-collapse-request-{idx}">
                            Request details
                        </button>
                    </h2>
                    <div id="details-accordion-collapse-request-{idx}" class="accordion-collapse collapse" data-bs-parent="#details-accordion-{idx}">
                        <table class="table details-table">
                            <thead>
                                <tr>
                                    <td>Headers</td>
                                    <td>Body</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <ul class="list-group">
                                        {#each item.request.headers as {key, value}}
                                            <li class="list-group-item"><span class="fw-bold">{key}:</span> {value}</li>
                                        {/each}
                                        </ul>
                                    </td>
                                    <td>
                                        <pre>
                                            {prettyJson(item.request.body)}
                                        </pre></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#details-accordion-collapse-response-{idx}">
                            Response details
                        </button>
                    </h2>
                    <div id="details-accordion-collapse-response-{idx}" class="accordion-collapse collapse" data-bs-parent="#details-accordion-{idx}">
                        <table class="table details-table">
                            <thead>
                                <tr>
                                    <td>Headers</td>
                                    <td>Body</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <ul class="list-group">
                                            {#each item.response.headers as {key, value}}
                                                <li class="list-group-item"><span class="fw-bold">{key}:</span> {value}</li>
                                            {/each}
                                            </ul>
                                    </td>
                                    <td>
                                        <pre>
                                            {prettyJson(item.response.body)}
                                        </pre>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </td>
    </tr>
    {/if}
{/if}

<style>
    .details-table{
        table-layout: fixed;
    }
    .id-column, .method-column {
        width:48px;
    }
    .time-column{
        width:240px;
    }
    .url-column {
        max-width:230px;
        word-break: break-all;
    }
    .details-table .list-group-item {
        overflow-wrap: anywhere;
    }
</style>