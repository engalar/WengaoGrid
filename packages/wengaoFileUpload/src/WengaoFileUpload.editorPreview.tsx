import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { WengaoFileUploadPreviewProps } from "../typings/WengaoFileUploadProps";

export function preview({ sampleText }: WengaoFileUploadPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText} />;
}

export function getPreviewCss(): string {
    return require("./ui/WengaoFileUpload.css");
}
