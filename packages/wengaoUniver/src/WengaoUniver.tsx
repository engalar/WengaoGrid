import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { WengaoUniverContainerProps } from "../typings/WengaoUniverProps";

import "./ui/WengaoUniver.css";

export function WengaoUniver({ sampleText }: WengaoUniverContainerProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText ? sampleText : "World"} />;
}
