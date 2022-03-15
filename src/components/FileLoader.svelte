<script>
    import { is_empty } from "svelte/internal";
    import { parseXml } from '../utils/xml2json';
    import { parseRawItem } from '../utils/request-item-parser';
    import { FileUploaderButton, Button } from "carbon-components-svelte";
    import TrashCan16 from "carbon-icons-svelte/lib/TrashCan16";

    export let onFileLoaded = (rawItems) => {};
    export let onClear = () => {};

    let items = [];

    const loadFile = (event) => {
        if (is_empty(event.target.files)) {
            window.alert("No file selected.");
            return;
        }
        let file = event.target.files[0]
        file.text().then(xml => {
            let obj = parseXml(xml);
            items = obj.items[1].item.map(item => parseRawItem(item));
            onFileLoaded(items);
        })
    }

    const clear = () => {
        onClear();
    }
</script>

<FileUploaderButton labelText="Load file..." on:change={(e) => loadFile(e)}/>
<Button kind="danger" iconDescription="Clear" icon={TrashCan16} on:click={clear}/>