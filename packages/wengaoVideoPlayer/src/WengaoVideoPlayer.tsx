import { ReactElement, createElement, useCallback, useState, useEffect } from "react";
import { ValueStatus } from "mendix";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { WengaoVideoPlayerContainerProps } from "../typings/WengaoVideoPlayerProps";

import "./ui/WengaoVideoPlayer.css";
import Big from "big.js";

export function WengaoVideoPlayer({ playProgress }: WengaoVideoPlayerContainerProps): ReactElement {
    const [defaultProgress, setDefaultProgress] = useState<number>(0);
    const [prevProgress, setPrevProgress] = useState<number>(0);

    const handlePlayProgress = useCallback(
        (v: number) => {
            if (playProgress && playProgress.status === ValueStatus.Available && !playProgress.readOnly) {
                playProgress.setValue(Big(v));
                setPrevProgress(v);
            }
        },
        [playProgress]
    );

    const [hasSeeked, setHasSeeked] = useState<boolean>(false);

    // replay
    useEffect(() => {
        if (playProgress && playProgress.status === ValueStatus.Available && playProgress.value) {
            const pp = playProgress.value.toNumber();

            if (hasSeeked) {
                setHasSeeked(false);
                return;
            }
            // first time or backward or forward more than 1 second
            if (pp < prevProgress || pp > prevProgress) {
                const newValue = pp === defaultProgress ? -defaultProgress : pp;
                setDefaultProgress(newValue);
                setHasSeeked(true);
            }
        }
    }, [playProgress, prevProgress, defaultProgress, hasSeeked]);

    return <HelloWorldSample progress={defaultProgress} onProgress={handlePlayProgress} />;
}
