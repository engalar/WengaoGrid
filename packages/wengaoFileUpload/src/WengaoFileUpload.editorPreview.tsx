import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { WengaoFileUploadPreviewProps } from "../typings/WengaoFileUploadProps";

export function preview(props: WengaoFileUploadPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={props.class} />;
}

export function getPreviewCss(): string {
    return require("./ui/WengaoFileUpload.css");
}
