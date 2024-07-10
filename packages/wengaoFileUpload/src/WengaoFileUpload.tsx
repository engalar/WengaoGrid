import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { WengaoFileUploadContainerProps } from "../typings/WengaoFileUploadProps";

import "./ui/WengaoFileUpload.css";

export function WengaoFileUpload({ sampleText }: WengaoFileUploadContainerProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText ? sampleText : "World"} />;
}
