/**
 * This file was generated from WengaoVideoPlayer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { DynamicValue, EditableValue } from "mendix";
import { Big } from "big.js";

export interface QualitiesType {
    quality: string;
    url: DynamicValue<string>;
    videoType: string;
}

export interface QualitiesPreviewType {
    quality: string;
    url: string;
    videoType: string;
}

export interface WengaoVideoPlayerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    playProgress?: EditableValue<Big>;
    videoUrl: EditableValue<string>;
    qualities: QualitiesType[];
}

export interface WengaoVideoPlayerPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    playProgress: string;
    videoUrl: string;
    qualities: QualitiesPreviewType[];
}
