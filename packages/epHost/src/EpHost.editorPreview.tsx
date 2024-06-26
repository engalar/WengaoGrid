import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { EpHostPreviewProps } from "../typings/EpHostProps";

export function preview({ myAttribute }: EpHostPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={myAttribute} />;
}

export function getPreviewCss(): string {
    return require("./ui/EpHost.css");
}
