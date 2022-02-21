<script>
    import FileLoader from "./FileLoader.svelte";

    export let onItemsLoaded = (items) => {};

    let rawItems = [];

    const fileLoaded = (items) => {
      rawItems = items;
      onItemsLoaded(rawItems);
    }

    const clear = () => {
      rawItems = [];
      onItemsLoaded(rawItems);
    }
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <p class="navbar-brand">Burp Viewer</p>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" style="display:none">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
        </ul>
        <FileLoader onClear={clear} onFileLoaded={fileLoaded}/>
      </div>
    </div>
  </nav>