import { ReactElement, createElement, useEffect, useState } from "react";
import { ValueStatus } from "mendix";
// @ts-ignore
import App from "univer-lib";
import { IKeyMap } from "univer/src/App";


import "./ui/style.css";

import { WengaoUniverContainerProps } from "../typings/WengaoUniverProps";

import "./ui/WengaoUniver.css";
import classNames from "classnames";

export function WengaoUniver(props: WengaoUniverContainerProps): ReactElement {
    const [data, setData] = useState<IKeyMap<IKeyMap<string | number | boolean>>>();
    useEffect(() => {
        if (props.data && props.data.status === ValueStatus.Available) {
            const cellData: any = {};
            const headerRow: IKeyMap<string | number | boolean> = cellData[rowStart] = {};
            props.columns.forEach(column => {
                headerRow[column.column] = column.name;
            });
            
            props.data.items?.forEach((item, index) => {
                const rowIndex = index * rowGap + rowStart + 1;
                const row: any = {};
                props.columns.forEach(column => {
                    row[column.column] = column.columnAttr?.get(item).value.toString();
                });
                cellData[rowIndex] = row;
            });
            setData(cellData);
        }
    }, [props.data]);
    const rowStart = props.rowStart || 0, rowGap = props.rowGap;
    const columns = props.columns.map(e => {
        return {
            name: e.name,
            column: e.column,
            att: e.columnAttr
        };
    });
    return (
        <div className={classNames("wengao-univer", props.class)}>
            <App cellData={data} />
        </div>
    );
}
