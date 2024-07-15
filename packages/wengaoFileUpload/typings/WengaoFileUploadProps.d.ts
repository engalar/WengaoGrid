/**
 * This file was generated from WengaoFileUpload.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListActionValue, ListAttributeValue, ListExpressionValue } from "mendix";

export interface WengaoFileUploadContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    isMultiple: boolean;
    uploadUrl?: DynamicValue<string>;
    fileName?: EditableValue<string>;
    fileNameDatasource?: ListAttributeValue<string>;
    uploadUrlDatasource?: ListExpressionValue<string>;
    datasource?: ListValue;
    onUpload?: ActionValue;
    onNewFile?: ActionValue;
    onRemoveFile?: ListActionValue;
}

export interface WengaoFileUploadPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    isMultiple: boolean;
    uploadUrl: string;
    fileName: string;
    fileNameDatasource: string;
    uploadUrlDatasource: string;
    datasource: {} | { caption: string } | { type: string } | null;
    onUpload: {} | null;
    onNewFile: {} | null;
    onRemoveFile: {} | null;
}
