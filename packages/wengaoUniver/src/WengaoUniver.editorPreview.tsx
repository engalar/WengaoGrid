import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { WengaoUniverPreviewProps } from "../typings/WengaoUniverProps";

export function preview({ sampleText }: WengaoUniverPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText} />;
}

export function getPreviewCss(): string {
    return require("./ui/WengaoUniver.css");
}
