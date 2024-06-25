import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { EpPluginContainerProps } from "../typings/EpPluginProps";

import "./ui/EpPlugin.css";

export function EpPlugin({ sampleText }: EpPluginContainerProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText ? sampleText : "World"} />;
}
