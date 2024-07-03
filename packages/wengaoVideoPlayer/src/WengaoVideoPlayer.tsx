import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { WengaoVideoPlayerContainerProps } from "../typings/WengaoVideoPlayerProps";

import "./ui/WengaoVideoPlayer.css";

export function WengaoVideoPlayer({ sampleText }: WengaoVideoPlayerContainerProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText ? sampleText : "World"} />;
}
