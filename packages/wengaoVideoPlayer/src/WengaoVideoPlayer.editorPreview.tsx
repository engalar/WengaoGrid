import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { WengaoVideoPlayerPreviewProps } from "../typings/WengaoVideoPlayerProps";

export function preview({ sampleText }: WengaoVideoPlayerPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText} />;
}

export function getPreviewCss(): string {
    return require("./ui/WengaoVideoPlayer.css");
}
