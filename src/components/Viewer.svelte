<script>
    import RequestItem from "./RequestItem.svelte"; 
    export let items = [];
</script>

<div class="container">
    <div class="row">
        <table class="table table-sm table-striped table-hover">
            <thead class="table-dark">
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
                    <RequestItem item={item} idx={idx}/>
                {/each}
            </tbody>
            </table>
    </div>
</div>

<style>
</style>