import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { EpHostContainerProps } from "../typings/EpHostProps";

import "./ui/EpHost.css";

export function EpHost({ sampleText }: EpHostContainerProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText ? sampleText : "World"} />;
}
