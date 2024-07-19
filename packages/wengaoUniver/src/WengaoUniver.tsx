import { ReactElement, createElement, useEffect, useState, useMemo } from "react";
import { ValueStatus } from "mendix";
import App from "univer-lib";
import { connectInjector } from '@wendellhu/redi/react-bindings';
import { IKeyMap } from "univer/src";

import "./ui/style.css";

import { WengaoUniverContainerProps } from "../typings/WengaoUniverProps";

import "./ui/WengaoUniver.css";
import classNames from "classnames";
import { Inject, Injector } from "@wendellhu/redi";

export function WengaoUniver(props: WengaoUniverContainerProps): ReactElement {
    const [data, setData] = useState<IKeyMap<IKeyMap<string | number | boolean>>>([]);
    useEffect(() => {
        if (props.data && props.data.status === ValueStatus.Available) {
            const cellData: any = {};
            const headerRow: IKeyMap<string | number | boolean> = (cellData[rowStart] = {});
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
    const rowStart = props.rowStart || 0;
    const rowGap = props.rowGap;
    const injector = useMemo(() => {
        const _injector = new Injector();
        return _injector;
    }, []);
    connectInjector(App, injector);
    return (
        <div className={classNames("wengao-univer", props.class)}>
            <App cellData={data} />
        </div>
    );
}
