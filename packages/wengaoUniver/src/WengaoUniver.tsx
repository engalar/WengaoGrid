import { Fragment, ReactElement, createElement, useEffect, useState, useMemo } from "react";
import { ValueStatus } from "mendix";
import { connectInjector } from "@wendellhu/redi/react-bindings";
import { useObservable } from "@univerjs/ui";
import classNames from "classnames";
import { Injector } from "@wendellhu/redi";

import { applyHighlightFeature } from "./features";
import App, { Selection, ISelection, IKeyMap } from "./univer";
import "./ui/WengaoUniver.css";

import { WengaoUniverContainerProps } from "../typings/WengaoUniverProps";

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
    const [AppWrap, injector] = useMemo(() => {
        const injector = new Injector();
        injector.add([ISelection, new Selection()]);
        return [connectInjector(App, injector), injector];
    }, []);
    const selection = injector.get(ISelection);
    // @ts-ignore
    const range = useObservable(selection.range$);

    // features
    useEffect(() => {
        const disps = [applyHighlightFeature(injector)];
        return () => {
            disps.forEach(disp => disp.dispose());
        };
    }, []);

    return (
        <Fragment>
            <span>{JSON.stringify(range, null, 2)}</span>
            <div className={classNames("wengao-univer", props.class)}>
                {/* @ts-ignore */}
                <AppWrap cellData={data} />
            </div>
        </Fragment>
    );
}
