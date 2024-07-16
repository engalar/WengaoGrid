import { ReactElement } from "react";
import { WengaoUniverPreviewProps } from "../typings/WengaoUniverProps";

export function preview({ sampleText }: WengaoUniverPreviewProps): ReactElement {
    return <span>{sampleText}</span>;
}

export function getPreviewCss(): string {
    return require("./ui/WengaoUniver.css");
}
