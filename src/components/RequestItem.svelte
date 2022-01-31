<script>
    import { parseRequest } from "../utils/request-item-utils";
    import { onMount } from 'svelte';
    export let item;
    export let idx;

    let request = {};
    let response = {};
    let showDetails = false;

    onMount(() => {
        request = parseRequest(item.request.value, item.request.base64 === 'true');
        if(item.response) {
            response = parseRequest(item.response.value, item.request.base64 === 'true');
        } else {
            response = {
                body: '',
                headers: []
            }
        }
    })

    const prettyJson = (content) => {
        try {
            return JSON.stringify(JSON.parse(content),null,2)
        } catch (error) {
            return content;
        }
    }
</script>

<tr id="item-row-main-{idx}" on:click={() => {showDetails = !showDetails}}>
    <td class="id-column">&#35;{idx}</td>
    <td class="time-column">{item.time.value}</td>
    <td class="method-column">{item.method.value}</td>
    <td class="url-column">{item.url.value}</td>
    <td class="status-column">{item.status.value}</td>
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
                                    {#each request.headers as {key, value}}
                                        <li class="list-group-item"><span class="fw-bold">{key}:</span> {value}</li>
                                    {/each}
                                    </ul>
                                </td>
                                <td>
                                    <pre>
                                        {prettyJson(request.body)}
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
                                        {#each response.headers as {key, value}}
                                            <li class="list-group-item"><span class="fw-bold">{key}:</span> {value}</li>
                                        {/each}
                                        </ul>
                                </td>
                                <td>
                                    <pre>
                                        {prettyJson(response.body)}
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