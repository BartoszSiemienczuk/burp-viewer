<script>
    import { Grid, Row, Column } from "carbon-components-svelte";
    import { Tabs, Tab, TabContent } from "carbon-components-svelte";
    import { CodeSnippet } from "carbon-components-svelte";
    import { JsonView } from '@zerodevx/svelte-json-view';

    import {
        StructuredList,
        StructuredListHead,
        StructuredListRow,
        StructuredListCell,
        StructuredListBody,
    } from "carbon-components-svelte";

    export let item;

    const prettyJson = (content) => {
        try {
            return JSON.stringify(JSON.parse(content),null,2)
        } catch (error) {
            return content;
        }
    }
</script>

<Grid fullWidth>
    <Row>
        <Column>
            <Tabs>
                <Tab label="Raw" />
                <Tab label="Headers" />
                <Tab label="Body" />
                <Tab label="JSON" />
                <svelte:fragment slot="content">
                    <TabContent>
                        <CodeSnippet type="multi" code={item.raw.request.value} expanded={true}/>
                    </TabContent>
                    <TabContent>
                        <StructuredList condensed>
                            <StructuredListHead>
                                <StructuredListRow head>
                                    <StructuredListCell head>Key</StructuredListCell>
                                    <StructuredListCell head>Value</StructuredListCell>
                                </StructuredListRow>
                            </StructuredListHead>
                            <StructuredListBody>
                                {#each item.request.headers as {key, value}}
                                <StructuredListRow>
                                    <StructuredListCell noWrap>{key}</StructuredListCell>
                                    <StructuredListCell>{value}</StructuredListCell>
                                </StructuredListRow>
                                {/each}
                            </StructuredListBody>
                        </StructuredList>
                    </TabContent>
                    <TabContent>
                        <CodeSnippet type="multi" code={prettyJson(item.request.body)} expanded={true}/>
                    </TabContent>
                    <TabContent>
                        <JsonView json={item.request.body}/>
                    </TabContent>
                </svelte:fragment>
            </Tabs>
        </Column>
        <Column>
            <Tabs>
                <Tab label="Raw" />
                <Tab label="Headers" />
                <Tab label="Body" />
                <Tab label="JSON" />
                <svelte:fragment slot="content">
                    <TabContent>
                        <CodeSnippet type="multi" code={item.raw.response.value} expanded={true}/>
                    </TabContent>
                    <TabContent>
                        <StructuredList condensed>
                            <StructuredListHead>
                                <StructuredListRow head>
                                    <StructuredListCell head>Key</StructuredListCell>
                                    <StructuredListCell head>Value</StructuredListCell>
                                </StructuredListRow>
                            </StructuredListHead>
                            <StructuredListBody>
                                {#each item.response.headers as {key, value}}
                                <StructuredListRow>
                                    <StructuredListCell noWrap>{key}</StructuredListCell>
                                    <StructuredListCell>{value}</StructuredListCell>
                                </StructuredListRow>
                                {/each}
                            </StructuredListBody>
                        </StructuredList>
                    </TabContent>
                    <TabContent>
                        <CodeSnippet type="multi" code={prettyJson(item.response.body)} expanded={true}/>
                    </TabContent>
                    <TabContent>
                        <JsonView json={item.response.body}/>
                    </TabContent>
                </svelte:fragment>
            </Tabs>
        </Column>
    </Row>
</Grid>