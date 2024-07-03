import { ReactElement, createElement, useEffect, useRef } from "react";
import DPlayer from 'dplayer';

export interface HelloWorldSampleProps {
    sampleText?: string;
}

export function HelloWorldSample({ }: HelloWorldSampleProps): ReactElement {
    const playerRef = useRef(null);
    useEffect(() => {
        const dp = new DPlayer({
            container: playerRef.current,
            preload: 'none',
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
            video: {
                // url: 'file2?fileid=1',
                url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
                pic: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
                thumbnails: 'https://i.loli.net/2019/06/06/5cf8c5d9cec8510758.jpg'
            },
            subtitle: {
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
            ]
        });
        return () => {
            dp.destroy();
        };
    }, []);
    return <div ref={playerRef} className="widget-hello-world"></div>;
}
