<script>
    import { is_empty } from "svelte/internal";
    import { parseXml } from '../utils/xml2json';
    import { parseRawItem } from '../utils/request-item-parser';

    export let onFileLoaded = (rawItems) => {};
    export let onClear = () => {};

    let files = []; 
    let items = [];

    const loadFile = () => {
        if (is_empty(files)) {
            window.alert("No file selected.");
        }
        let file = files[0];
        file.text().then(xml => {
            let obj = parseXml(xml);
            items = obj.items[1].item.map(item => parseRawItem(item));
            console.log(items);
            onFileLoaded(items);
        })
    }

    const clear = () => {
        onClear();
    }
</script>


<form class="d-flex">
    <input class="form-control me-2" type="file" bind:files on:change={() => loadFile()}>
    <button class="btn btn-outline-danger" type="button" on:click={clear}>Clear</button>
</form>