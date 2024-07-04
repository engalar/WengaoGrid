import { ReactElement, createElement, useCallback, useState, useEffect } from "react";
import { ValueStatus } from "mendix";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { WengaoVideoPlayerContainerProps } from "../typings/WengaoVideoPlayerProps";

import "./ui/WengaoVideoPlayer.css";
import Big from "big.js";

export function WengaoVideoPlayer({ playProgress }: WengaoVideoPlayerContainerProps): ReactElement {
    const [progress, setProgress] = useState<number>(0);

    const handlePlayProgress = useCallback((v: number) => {
        if (playProgress && playProgress.status === ValueStatus.Available && !playProgress.readOnly) {
            // only update when requestAnimationFrame
            // requestAnimationFrame(() => {
            // });
            playProgress.setValue(Big(v));
        }
    }, [playProgress]);

    useEffect(() => {
        if (playProgress && playProgress.status === ValueStatus.Available && playProgress.value) {
            const v = playProgress.value.toNumber();
            if (v < 0) {
                setProgress(-v);
                playProgress.setValue(Big(-v));
            }
        }
    }, [playProgress]);

    return <HelloWorldSample progress={progress} onProgress={handlePlayProgress} />;
}
