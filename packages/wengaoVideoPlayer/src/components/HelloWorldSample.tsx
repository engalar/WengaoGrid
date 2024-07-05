import { ReactElement, createElement, useEffect, useRef } from "react";
import DPlayer from "dplayer";

export interface HelloWorldSampleProps {
    onProgress?: (e: number) => void;
    progress: number;
    isPlaying: boolean;
}

export function HelloWorldSample({ onProgress, progress, isPlaying }: HelloWorldSampleProps): ReactElement {
    const playerRef = useRef(null);
    const dpRef = useRef<DPlayer | null>(null);
    const cbRef = useRef(onProgress);
    useEffect(() => {
        cbRef.current = onProgress;
    }, [onProgress]);

    useEffect(() => {
        const dp = new DPlayer({
            container: playerRef.current,
            preload: "auto",
            autoplay: false,
            theme: "#FADFA3",
            loop: true,
            screenshot: true,
            airplay: true,
            chromecast: true,
            hotkey: true,
            logo: "https://i.loli.net/2019/06/06/5cf8c5d94521136430.png",
            volume: 1,
            mutex: true,
            lang: "zh-cn",
            highlight: [
                { text: "highlight text", time: 20 },
                { text: "highlight text2", time: 60 }
            ],
            video: {
                quality: [
                    {
                        name: "HD",
                        url: "demo.m3u8",
                        type: "hls"
                    },
                    {
                        name: "SD",
                        url: "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
                        type: "normal"
                    },
                    {
                        name: "LD",
                        url: "file2?fileid=1"
                    }
                ],
                defaultQuality: 1
                // url: 'http://localhost:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3Rlc3QvMjAyNC0wNC0xOCUyMDA5LTA1LTMyLm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPURBRVJVSFU3VkdDN0FBUEZSS0JDJTJGMjAyNDA3MDMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNzAzVDA5MDc1NVomWC1BbXotRXhwaXJlcz00MzE5OSZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSkVRVVZTVlVoVk4xWkhRemRCUVZCR1VrdENReUlzSW1WNGNDSTZNVGN5TURBME1ETTNNaXdpY0dGeVpXNTBJam9pVWs5UFZGVlRSVklpZlEuV3RZd2hlRzdpeWZabUE3Q0pZYnU1UlZhdXdrYWNabkY5eDRmUjg4Tm9WQm5ES2FHR0xSSXJYWlhsUTFQTmhfVmo0MDJBek05ZzdNbDVqWnJWQ20xSlEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnZlcnNpb25JZD1udWxsJlgtQW16LVNpZ25hdHVyZT04NmM2M2E5MzAzMDgwOTQ4YzhmODc0ZTBlOTZlM2I2OTA1Zjg5YzQ0OWJlMjk3MWE1ZjEyYTVjYWY3YjM1OWM5',
                // url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
                // pic: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
                // thumbnails: 'https://i.loli.net/2019/06/06/5cf8c5d9cec8510758.jpg'
            }
            /* subtitle: {
                url: [
                    {
                        url: 'https://s-sh-17-dplayercdn.oss.dogecdn.com/hikarunara.vtt',
                        lang: 'zh-cn',
                        name: '光',
                    },
                    {
                        url: 'https://gist.githubusercontent.com/samdutton/ca37f3adaf4e23679957b8083e061177/raw/e19399fbccbc069a2af4266e5120ae6bad62699a/sample.vtt',
                        lang: 'en-us',
                        name: 'github',
                    },
                ],
                defaultSubtitle: 0,
                type: 'webvtt',
                fontSize: '25px',
                bottom: '10%',
                color: '#b7daff'
            },
            danmaku: {
                id: '9E2E3368B56CDBB4',
                api: 'https://api.prprpr.me/dplayer/',
                addition: ['https://s-sh-17-dplayercdn.oss.dogecdn.com/1678963.json'],
                token: 'tokendemo',
                maximum: 3000,
                user: 'DIYgod',
                bottom: '15%',
                unlimited: true,
                speedRate: 0.5,
            },
            contextmenu: [
                {
                    text: 'custom contextmenu',
                    link: 'https://github.com/MoePlayer/DPlayer'
                }
            ] */
        });
        dpRef.current = dp;

        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event
        const events: DPlayerEvents[] = [
            "abort",
            "canplay",
            "canplaythrough",
            "durationchange",
            "emptied",
            "ended",
            "error",
            "loadeddata",
            "loadedmetadata",
            "loadstart",
            "mozaudioavailable",
            "pause",
            "play",
            "timeupdate",
            "playing",
            "ratechange",
            "seeked",
            "seeking",
            "stalled",
            "volumechange",
            "waiting",
            "screenshot",
            "thumbnails_show",
            "thumbnails_hide",
            "danmaku_show",
            "danmaku_hide",
            "danmaku_clear",
            "danmaku_loaded",
            "danmaku_send",
            "danmaku_opacity",
            "contextmenu_show",
            "contextmenu_hide",
            "notice_show",
            "notice_hide",
            "quality_start",
            "quality_end",
            "destroy",
            "resize",
            "fullscreen",
            "fullscreen_cancel",
            "webfullscreen",
            "webfullscreen_cancel",
            "subtitle_show",
            "subtitle_hide",
            "subtitle_change"
        ];
        for (const event of events) {
            dp.on(event, (_info: any) => {
                if (event === "timeupdate") {
                    const video = dp.video;
                    const hours = Math.floor(video.currentTime / (60 * 60));
                    const minutes = Math.floor(video.currentTime / 60);
                    const seconds = Math.floor(video.currentTime % 60);
                    // var timeDisplay = (hours > 0 ? hours + ":" : "") + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

                    // all time transform to seconds
                    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
                    cbRef.current?.(totalSeconds);
                }
            });
        }

        return () => {
            dp.destroy();
        };
    }, []);
    useEffect(() => {
        if (dpRef.current) {
            const dp = dpRef.current;
            if (dp.video.paused && isPlaying) {
                cbRef.current = onProgress;
                dp.play();
            } else if (!dp.video.paused &&!isPlaying) {
                // reset cb before pause
                cbRef.current = undefined;
                dp.pause();
                return;
            }
            if (dp.video.currentTime === Math.abs(progress)) {
                return;
            }
            dp.pause();
            setTimeout(() => {
                dp.seek(Math.abs(progress));
                dp.play();
            }, 0);
        }
    }, [progress, isPlaying]);
    return (
        <div className="widget-hello-world">
            <div ref={playerRef}></div>
        </div>
    );
}
