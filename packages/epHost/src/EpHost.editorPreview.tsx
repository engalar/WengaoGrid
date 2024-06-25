import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { EpHostPreviewProps } from "../typings/EpHostProps";

export function preview({ name1 }: EpHostPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={name1} />;
}

export function getPreviewCss(): string {
    return require("./ui/EpHost.css");
}
