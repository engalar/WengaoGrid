import { ReactElement, createElement, useCallback } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { WengaoVideoPlayerContainerProps } from "../typings/WengaoVideoPlayerProps";

import "./ui/WengaoVideoPlayer.css";
import Big from "big.js";

export function WengaoVideoPlayer({ playProgress }: WengaoVideoPlayerContainerProps): ReactElement {
    // callback
    const handlePlayProgress = useCallback((progress: number) => {
        playProgress?.setValue(Big(progress));
    }, [playProgress]);
    return <HelloWorldSample progress={handlePlayProgress} />;
}
