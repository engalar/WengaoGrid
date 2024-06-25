import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { EpHostPreviewProps } from "../typings/EpHostProps";

export function preview({ sampleText }: EpHostPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText} />;
}

export function getPreviewCss(): string {
    return require("./ui/EpHost.css");
}
