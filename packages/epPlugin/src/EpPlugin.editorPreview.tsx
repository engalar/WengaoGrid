import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { EpPluginPreviewProps } from "../typings/EpPluginProps";

export function preview({ sampleText }: EpPluginPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText} />;
}

export function getPreviewCss(): string {
    return require("./ui/EpPlugin.css");
}
