<script>
    import { Header, HeaderUtilities, SkipToContent } from "carbon-components-svelte";
    import FileLoader from "./FileLoader.svelte";
import ThemeSwitcher from "./ThemeSwitcher.svelte";

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


<Header platformName="Burp Viewer">
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderUtilities>
    <ThemeSwitcher/>
    <FileLoader onClear={clear} onFileLoaded={fileLoaded}/>
  </HeaderUtilities>
</Header>