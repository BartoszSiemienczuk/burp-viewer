<script>
    import { parseRequest } from "../utils/request-item-utils";
    import { onMount } from 'svelte';
    export let item;
    export let idx;

    let request = {};
    let showDetails = false;

    onMount(() => {
        request = parseRequest(item.request.value);
    })
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
                    <td>{request.body}</td>
                </tr>
            </tbody>
        </table>
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
</style>