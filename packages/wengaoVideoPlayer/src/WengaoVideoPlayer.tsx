import { ReactElement, createElement, useCallback, useState, useEffect } from "react";
import { ValueStatus } from "mendix";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { WengaoVideoPlayerContainerProps } from "../typings/WengaoVideoPlayerProps";

import "./ui/WengaoVideoPlayer.css";
import Big from "big.js";
import { usePrevious } from "ahooks";

export function WengaoVideoPlayer({ playProgress }: WengaoVideoPlayerContainerProps): ReactElement {
    const [defaultProgress, setDefaultProgress] = useState<number>(0);
    const prevDefaultProgress = usePrevious(defaultProgress);
    const [prevProgress, setPrevProgress] = useState<number>(0);


    const handlePlayProgress = useCallback((v: number) => {
        if (playProgress && playProgress.status === ValueStatus.Available && !playProgress.readOnly) {
            playProgress.setValue(Big(v));
            setPrevProgress(v);
            console.log("set progress <-", v);
        }
    }, [playProgress]);

    // replay
    useEffect(() => {
        if (playProgress && playProgress.status === ValueStatus.Available && playProgress.value) {
            const pp = playProgress.value.toNumber();

            if ((prevDefaultProgress === undefined) || (pp < prevProgress) || (pp > prevProgress + 1)) {
                setDefaultProgress(pp == prevDefaultProgress ? -prevDefaultProgress : pp);
                console.log("set progress ->", pp, prevDefaultProgress, prevProgress);// 220 1 235
            }
        }
    }, [playProgress, prevDefaultProgress, prevProgress]);

    return <HelloWorldSample progress={defaultProgress} onProgress={handlePlayProgress} />;
}
