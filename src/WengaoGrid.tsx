import { ReactElement, createElement, useCallback } from "react";

import { WengaoGridContainerProps } from "../typings/WengaoGridProps";
import "./ui/WengaoGrid.css";
import { MyTable } from "./components/MyTable";

export function WengaoGrid(props: WengaoGridContainerProps): ReactElement {
    const { wengaogridType, wengaogridValue, valueAttribute, onClickAction, style } = props;
    const onClickHandler = useCallback(() => {
        if (onClickAction && onClickAction.canExecute) {
            onClickAction.execute();
        }
    }, [onClickAction]);

    return (
            <MyTable
            type={wengaogridType}
            className={props.class}
            clickable={!!onClickAction}
            defaultValue={wengaogridValue ? wengaogridValue : ""}
            onClickAction={onClickHandler}
            style={style}
            value={valueAttribute ? valueAttribute.displayValue : ""} />
    );
}
