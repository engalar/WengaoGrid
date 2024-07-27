/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import "./index.css";

import { ICommandInfo, IWorkbookData, Univer, UniverInstanceType, Workbook, LocaleType, Tools } from "@univerjs/core";
import { defaultTheme } from "@univerjs/design";
import { UniverDocsPlugin } from "@univerjs/docs";
import { UniverDocsUIPlugin } from "@univerjs/docs-ui";
import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { DeviceInputEventType, UniverRenderEnginePlugin } from "@univerjs/engine-render";
import { SelectionMoveType, SetSelectionsOperation, UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
import { UniverSheetsUIPlugin } from "@univerjs/sheets-ui";
import { UniverUIPlugin } from "@univerjs/ui";
import { FUniver } from "@univerjs/facade";
import { forwardRef, useEffect, useImperativeHandle, useRef, useMemo, createElement } from "react";

import DesignZhCN from "@univerjs/design/lib/locale/zh-CN.json";
import UIZhCN from "@univerjs/ui/lib/locale/zh-CN.json";
import DocsUIZhCN from "@univerjs/docs-ui/lib/locale/zh-CN.json";
import SheetsZhCN from "@univerjs/sheets/lib/locale/zh-CN.json";
import SheetsUIZhCN from "@univerjs/sheets-ui/lib/locale/zh-CN.json";

export const UniverSheet = forwardRef(({ data, onClick, onDbClick }: any, ref) => {
    const locale = useMemo(() => {
        // @ts-ignore
        return mx.session.getConfig("locale").code.replace("_", "") as LocaleType;
    }, []);
    const univerRef = useRef<Univer>();
    const workbookRef = useRef<Workbook>();
    const containerRef = useRef(null);
    /** @type {React.RefObject<FUniver>} */
    const fUniverRef = useRef<FUniver>();

    useImperativeHandle(ref, () => ({
        getData,
        univerAPI: fUniverRef
    }));

    /**
     * Destroy univer instance and workbook instance
     */
    const destroyUniver = () => {
        // univerRef.current?.dispose();
        univerRef.current = undefined;
        workbookRef.current = undefined;
    };

    /**
     * Get workbook data
     */
    const getData = () => {
        if (!workbookRef.current) {
            throw new Error("Workbook is not initialized");
        }
        return workbookRef.current.save();
    };

    useEffect(() => {
        const init = (data = {}) => {
            if (!containerRef.current) {
                throw Error("container not initialized");
            }
            const univer = new Univer({
                theme: defaultTheme,
                locale,
                locales: {
                    [LocaleType.ZH_CN]: Tools.deepMerge(SheetsZhCN, DocsUIZhCN, SheetsUIZhCN, UIZhCN, DesignZhCN)
                }
            });
            univerRef.current = univer;

            // core plugins
            univer.registerPlugin(UniverRenderEnginePlugin);
            univer.registerPlugin(UniverFormulaEnginePlugin);
            // @ts-ignore
            univer.registerPlugin(UniverUIPlugin, {
                container: containerRef.current
            });

            // doc plugins
            univer.registerPlugin(UniverDocsPlugin, {
                hasScroll: false
            });
            univer.registerPlugin(UniverDocsUIPlugin);

            // sheet plugins
            univer.registerPlugin(UniverSheetsPlugin);
            univer.registerPlugin(UniverSheetsUIPlugin);
            univer.registerPlugin(UniverSheetsFormulaPlugin);

            // create workbook instance
            workbookRef.current = univer.createUnit<IWorkbookData, Workbook>(UniverInstanceType.UNIVER_SHEET, data);

            // craete Facade API instance
            fUniverRef.current = FUniver.newAPI(univer);
        };
        init(data);

        let clickTime = 0;
        let dbClickTime = 0;
        const onClickDebounce = (e: any): void => {
            // debounce click
            if (Date.now() - dbClickTime < 500) {
                return;
            }
            if (Date.now() - clickTime < 500) {
                return;
            }
            onClick?.(e);
            clickTime = Date.now();
        };

        fUniverRef.current?.onCommandExecuted((command: Readonly<ICommandInfo<any>>) => {
            if (command.id === SetSelectionsOperation.id && command.params.type === SelectionMoveType.MOVE_END) {
                // mock click event
                setTimeout(() => {
                    onClickDebounce?.(undefined);
                }, 250);
            }

            // mock dbclick event
            // use command name string, because command id is not exported
            if (command.id === "sheet.operation.set-cell-edit-visible") {
                // mock dbclick event
                if (command.params.eventType === DeviceInputEventType.Dblclick) {
                    dbClickTime = Date.now();

                    onDbClick?.();
                }
            }
        });

        return () => {
            destroyUniver();
        };
    }, [data, onClick, onDbClick, locale]);

    return <div ref={containerRef} className="univer-container"></div>;
});
