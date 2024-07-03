import { ReactElement, createElement, useEffect, useRef } from "react";
import DPlayer from "dplayer";
import { DPlayerEvents } from "typings/dplayer";

export interface HelloWorldSampleProps {
    sampleText?: string;
}

export function HelloWorldSample({ }: HelloWorldSampleProps): ReactElement {
    const playerRef = useRef(null);
    const evtRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const dp = new DPlayer({
            container: playerRef.current,
            preload: 'auto',
            autoplay: false,
            theme: '#FADFA3',
            loop: true,
            screenshot: true,
            airplay: true,
            chromecast: true,
            hotkey: true,
            logo: 'https://i.loli.net/2019/06/06/5cf8c5d94521136430.png',
            volume: 0.2,
            mutex: true,
            lang: 'zh-cn',
            highlight: [{ text: 'highlight text', time: 600 }, { text: 'highlight text2', time: 1200 }],
            video: {
                quality: [
                    {
                        name: 'HD',
                        url: 'demo.m3u8',
                        type: 'hls',
                    },
                    {
                        name: 'SD',
                        url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
                        type: 'normal',
                    },
                    {
                        name: 'LD',
                        url: 'file2?fileid=1',
                    }
                ], defaultQuality: 1,
                // url: 'http://localhost:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3Rlc3QvMjAyNC0wNC0xOCUyMDA5LTA1LTMyLm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPURBRVJVSFU3VkdDN0FBUEZSS0JDJTJGMjAyNDA3MDMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNzAzVDA5MDc1NVomWC1BbXotRXhwaXJlcz00MzE5OSZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSkVRVVZTVlVoVk4xWkhRemRCUVZCR1VrdENReUlzSW1WNGNDSTZNVGN5TURBME1ETTNNaXdpY0dGeVpXNTBJam9pVWs5UFZGVlRSVklpZlEuV3RZd2hlRzdpeWZabUE3Q0pZYnU1UlZhdXdrYWNabkY5eDRmUjg4Tm9WQm5ES2FHR0xSSXJYWlhsUTFQTmhfVmo0MDJBek05ZzdNbDVqWnJWQ20xSlEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnZlcnNpb25JZD1udWxsJlgtQW16LVNpZ25hdHVyZT04NmM2M2E5MzAzMDgwOTQ4YzhmODc0ZTBlOTZlM2I2OTA1Zjg5YzQ0OWJlMjk3MWE1ZjEyYTVjYWY3YjM1OWM5',
                // url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
                // pic: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
                // thumbnails: 'https://i.loli.net/2019/06/06/5cf8c5d9cec8510758.jpg'
            },
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

        const events: DPlayerEvents[] = [
            'abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error',
            'loadeddata', 'loadedmetadata', 'loadstart', 'mozaudioavailable', 'pause', 'play',
            'playing', 'ratechange', 'seeked', 'seeking', 'stalled',
            'volumechange', 'waiting',
            'screenshot',
            'thumbnails_show', 'thumbnails_hide',
            'danmaku_show', 'danmaku_hide', 'danmaku_clear',
            'danmaku_loaded', 'danmaku_send', 'danmaku_opacity',
            'contextmenu_show', 'contextmenu_hide',
            'notice_show', 'notice_hide',
            'quality_start', 'quality_end',
            'destroy',
            'resize',
            'fullscreen', 'fullscreen_cancel', 'webfullscreen', 'webfullscreen_cancel',
            'subtitle_show', 'subtitle_hide', 'subtitle_change'
        ];
        const eventsEle = evtRef.current!;
        let count = 0;
        for (let i = 0; i < events.length; i++) {
            dp.on(events[i], (info: any) => {
                count++;
                eventsEle.innerHTML += `<p>Event ${count}: ${events[i]} ${info ? `Data: <span>${JSON.stringify(info)}</span>` : ''}</p>`;
                eventsEle.scrollTop = eventsEle.scrollHeight;
            });
        }

        return () => {
            dp.destroy();
        };
    }, []);
    return <div className="widget-hello-world">
        <div ref={playerRef}></div>
        <div ref={evtRef} style={{ maxHeight: '300px', overflowY: 'scroll' }}></div>
    </div>;
}
