/**
 * This file was generated from EpHost.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, ListValue, ListAttributeValue, SelectionSingleValue, SelectionMultiValue } from "mendix";
import { Big } from "big.js";

export interface EpHostContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    data: ListValue;
    myAttribute: ListAttributeValue<string>;
    myCredit: ListAttributeValue<Big>;
    onSelectionChange?: ActionValue;
    selection?: SelectionSingleValue | SelectionMultiValue;
}

export interface EpHostPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    data: {} | { caption: string } | { type: string } | null;
    myAttribute: string;
    myCredit: string;
    onSelectionChange: {} | null;
    selection: "None" | "Single" | "Multi";
}
