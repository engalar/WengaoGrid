import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { EpPluginContainerProps } from "../typings/EpPluginProps";

import "./ui/EpPlugin.css";


// extension point instance
const targetName = 'epHost1';
function eh(event: any) {
    window.removeEventListener(`__ep:${targetName}`, eh);
    console.log("EpPlugin received event", event);

    // @ts-ignore
    event.detail.selection.push(function (row, col1, col2) {
        if (col2 > 0) {
            return true;
        } else {
            return false;
        }
    });
}
// register extension point
window.addEventListener(`__ep:${targetName}`, eh);

export function EpPlugin({ sampleText }: EpPluginContainerProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText ? sampleText : "World"} />;
}
