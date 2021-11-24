<script>
    import { is_empty } from "svelte/internal";
    import { parseXml } from '../utils/xml2json';

    export let onItemsLoaded = (items) => {};

    let files = []; 
    let items = [];

    const loadFile = () => {
        if (is_empty(files)) {
            window.alert("No file selected.");
        }
        let file = files[0];
        file.text().then(xml => {
            let obj = parseXml(xml);
            items = obj.items[1].item;
            onItemsLoaded(items);
        })
    }

    const clear = () => {
        items = [];
        onItemsLoaded(items);
    }
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Burp Viewer</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" style="display:none">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="file" bind:files>
          <button class="btn btn-outline-success" type="button" on:click={loadFile}>Load</button>
          <button class="btn btn-outline-danger" type="button" on:click={clear}>Clear</button>
        </form>
      </div>
    </div>
  </nav>