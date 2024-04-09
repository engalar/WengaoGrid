import { ReactElement, createElement } from "react";

import { parseInlineStyle } from "@mendix/pluggable-widgets-tools";

import { WengaoGridPreviewProps } from "../typings/WengaoGridProps";
import { MyTable, MyTableProps } from "./components/MyTable";

function parentInline(node?: HTMLElement | null): void {
    // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
    if (node && node.parentElement && node.parentElement.parentElement) {
        node.parentElement.parentElement.style.display = "inline-block";
    }
}

function transformProps(props: WengaoGridPreviewProps): MyTableProps {
    return {
        className: props.className,
        style: parseInlineStyle(props.style)
    };
}

export function preview(props: WengaoGridPreviewProps): ReactElement {
    return (
        <div ref={parentInline}>
            <MyTable {...transformProps(props)}></MyTable>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/WengaoGrid.css");
}
