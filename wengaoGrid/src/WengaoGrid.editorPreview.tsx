import { ReactElement, createElement } from "react";

import { parseInlineStyle } from "@mendix/pluggable-widgets-tools";

import { BadgeSample, BadgeSampleProps } from "./components/BadgeSample";
import { WengaoGridPreviewProps } from "../typings/WengaoGridProps";

function parentInline(node?: HTMLElement | null): void {
    // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
    if (node && node.parentElement && node.parentElement.parentElement) {
        node.parentElement.parentElement.style.display = "inline-block";
    }
}

function transformProps(props: WengaoGridPreviewProps): BadgeSampleProps {
    return {
        type: props.wengaogridType,
        bootstrapStyle: props.bootstrapStyle,
        className: props.className,
        clickable: false,
        style: parseInlineStyle(props.style),
        defaultValue: props.wengaogridValue ? props.wengaogridValue : "",
        value: props.valueAttribute
    };
}

export function preview(props: WengaoGridPreviewProps): ReactElement {
    return (
        <div ref={parentInline}>
            <BadgeSample {...transformProps(props)}></BadgeSample>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/WengaoGrid.css");
}
