import { ReactElement, createElement } from "react";
import { WengaoUniverPreviewProps } from "../typings/WengaoUniverProps";

export function preview(props: WengaoUniverPreviewProps): ReactElement {
    return <span>{props.class}</span>;
}

export function getPreviewCss(): string {
    return require("./ui/WengaoUniver.css");
}
