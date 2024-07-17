import { ReactElement, createElement } from "react";
// @ts-ignore
import App from "univer-lib";
import "./ui/style.css";

import { WengaoUniverContainerProps } from "../typings/WengaoUniverProps";

import "./ui/WengaoUniver.css";
import classNames from "classnames";

export function WengaoUniver(props: WengaoUniverContainerProps): ReactElement {
    return (
        <div className={classNames("wengao-univer", props.class)}>
            <App />
        </div>
    );
}
