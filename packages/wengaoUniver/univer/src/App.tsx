import { useCallback, useEffect, useRef, useState, ReactElement, createElement, MutableRefObject } from "react";
import { UniverSheet } from "./components/UniverSheet";
import { getDefaultWorkbookData } from "./assets/default-workbook-data";
import { CommandType, ICommandInfo, IWorkbookData, Univer } from "@univerjs/core";
import { FUniver } from "@univerjs/facade";
import { useDependency } from '@wendellhu/redi/react-bindings';
import { ISelection } from "./features";

export interface IKeyMap<T> {
    [key: number]: T;
}

function App({ cellData = {} }: { cellData: IKeyMap<IKeyMap<string | number | boolean>> }): ReactElement {
    const selection2 = useDependency(ISelection);
    const [data,] = useState<IWorkbookData>(() => getDefaultWorkbookData());
    const univerRef = useRef<Univer & { univerAPI: MutableRefObject<FUniver> }>();

    useEffect(() => {
        const univerAPI = univerRef.current?.univerAPI.current!;
        Object.keys(cellData).forEach((rowKey) => {
            Object.keys(cellData![+rowKey]).forEach(colKey => {
                univerAPI.getActiveWorkbook()?.getSheets()[0].getRange(+rowKey, +colKey, 1, 1)
                    ?.setValue(cellData[+rowKey][+colKey]);
            });
        });
    }, [cellData]);


    const logSelection = useCallback(() => {
        const univerAPI: FUniver = univerRef.current?.univerAPI?.current!;
        const selection = univerAPI.getActiveWorkbook()?.getActiveSheet()?.getSelection();
        const range = selection?.getActiveRange();
        if (range) {
            selection2.range$.next({ x: range.getColumn(), y: range.getRow(), width: range.getWidth(), height: range.getHeight() });
        }
    }, [univerRef, selection2]);
    useEffect(() => {
        const univerAPI: FUniver | undefined = univerRef.current?.univerAPI.current!;
        const { dispose } = univerAPI.onCommandExecuted((command: Readonly<ICommandInfo<any>>) => {
            [command]
                .filter(
                    cmd =>
                        [
                            CommandType.COMMAND, // Command
                            CommandType.OPERATION, // Operation
                            CommandType.MUTATION // Mutation
                        ].indexOf(cmd.type!) !== -1
                )
                .filter(
                    // Filter by id, only show the following ids
                    cmd =>
                        [
                            /set-selections/, // selection change
                            // /set-cell-edit-visible/,  // floating cell edit
                        ].find(rule => {
                            if (rule instanceof RegExp) {
                                return rule.test(cmd.id);
                            } else {
                                return rule === cmd.id;
                            }
                        })
                )
                .map(cmd => {
                    logSelection();
                });
        });

        return () => {
            dispose();
        };
    }, []);


    return (
        <UniverSheet
            style={{ flex: "auto" }}
            ref={univerRef}
            data={data}
            onClick={null}
            onDbClick={null}
        />
    );
}

export default App;
