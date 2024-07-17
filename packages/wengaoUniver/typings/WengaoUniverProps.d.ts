/**
 * This file was generated from WengaoUniver.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export interface ColumnsType {
    name: string;
    column: number;
    columnAttr?: ListAttributeValue<string | Big | any | boolean | Date>;
}

export interface ColumnsPreviewType {
    name: string;
    column: number | null;
    columnAttr: string;
}

export interface WengaoUniverContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    data?: ListValue;
    rowStart: number;
    rowGap: number;
    columns: ColumnsType[];
}

export interface WengaoUniverPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    data: {} | { caption: string } | { type: string } | null;
    rowStart: number | null;
    rowGap: number | null;
    columns: ColumnsPreviewType[];
}
