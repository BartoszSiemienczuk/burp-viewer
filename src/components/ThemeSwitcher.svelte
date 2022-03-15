<script>
    import { Select, SelectItem, Theme } from 'carbon-components-svelte';

    let theme = 'g80';
</script>

<Theme bind:theme persist persistKey="__brpv-carbon-theme" />
<Select inline labelText="Theme" bind:selected={theme}>
    <SelectItem value="white" text="White" />
    <SelectItem value="g10" text="Gray 10" />
    <SelectItem value="g80" text="Gray 80" />
    <SelectItem value="g90" text="Gray 90" />
    <SelectItem value="g100" text="Gray 100" />
  </Select>