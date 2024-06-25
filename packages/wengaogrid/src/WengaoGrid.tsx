import { ReactElement, createElement } from "react";

import { WengaoGridContainerProps } from "../typings/WengaoGridProps";
import "./ui/WengaoGrid.css";
import { MyTable } from "./components/MyTable";

export function WengaoGrid(props: WengaoGridContainerProps): ReactElement {
    const { style } = props;

    return <MyTable className={props.class} style={style} />;
}
