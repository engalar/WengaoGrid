# release

```sh
pnpm run build:univer
pnpm run install
pnpm run release
```

````html
<script src="https://unpkg.com/@univerjs/umd@0.2.3/lib/univer.slim.umd.js"></script>
<script src="https://unpkg.com/@univerjs/umd@0.2.3/lib/locale/zh-CN.js"></script>
<script src="mxclientsystem/mxui/mxui.js?638575811735436995"></script>
<script>
    mendix.lang.registerInDojo("@univerjs/core", UniverCore);
    mendix.lang.registerInDojo("@univerjs/design", UniverDesign);
    mendix.lang.registerInDojo("@univerjs/docs", UniverDocs);
    mendix.lang.registerInDojo("@univerjs/docs-ui", UniverDocsUi);
    mendix.lang.registerInDojo("@univerjs/engine-formula", UniverEngineFormula);
    mendix.lang.registerInDojo("@univerjs/engine-render", UniverEngineRender);
    mendix.lang.registerInDojo("@univerjs/facade", UniverFacade);
    mendix.lang.registerInDojo("@univerjs/network", UniverNetwork);
    mendix.lang.registerInDojo("@univerjs/rpc", UniverRpc);
    mendix.lang.registerInDojo("@univerjs/sheets", UniverSheets);
    mendix.lang.registerInDojo("@univerjs/sheets-formula", UniverSheetsFormula);
    mendix.lang.registerInDojo("@univerjs/sheets-numfmt", UniverSheetsNumfmt);
    mendix.lang.registerInDojo("@univerjs/sheets-ui", UniverSheetsUi);
    mendix.lang.registerInDojo("@univerjs/ui", UniverUi);
</script>
```
````

```js
require({
    cache: {
        wengao: function () {
            define(["exports"], function (e) {
                return {
                    lf: "sb"
                };
            });

            // or place umd bundle here
        },
    }
});
```
