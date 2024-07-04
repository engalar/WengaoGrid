import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { WengaoVideoPlayerPreviewProps } from "../typings/WengaoVideoPlayerProps";

export function preview({ }: WengaoVideoPlayerPreviewProps): ReactElement {
    return <HelloWorldSample progress={0} />;
}

export function getPreviewCss(): string {
    return require("./ui/WengaoVideoPlayer.css");
}
