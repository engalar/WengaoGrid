/**
 * This file was generated from WengaoVideoPlayer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "mendix";
import { Big } from "big.js";

export interface WengaoVideoPlayerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    playProgress?: EditableValue<Big>;
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
}
