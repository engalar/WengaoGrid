import { ReactElement, createElement, useCallback } from "react";

import { WengaoGridContainerProps } from "../typings/WengaoGridProps";
import { BadgeSample } from "./components/BadgeSample";
import "./ui/WengaoGrid.css";

export function WengaoGrid(props: WengaoGridContainerProps): ReactElement {
    const { wengaogridType, wengaogridValue, valueAttribute, onClickAction, style, bootstrapStyle } = props;
    const onClickHandler = useCallback(() => {
        if (onClickAction && onClickAction.canExecute) {
            onClickAction.execute();
        }
    }, [onClickAction]);

    return (
        <BadgeSample
            type={wengaogridType}
            bootstrapStyle={bootstrapStyle}
            className={props.class}
            clickable={!!onClickAction}
            defaultValue={wengaogridValue ? wengaogridValue : ""}
            onClickAction={onClickHandler}
            style={style}
            value={valueAttribute ? valueAttribute.displayValue : ""} />
    );
}
