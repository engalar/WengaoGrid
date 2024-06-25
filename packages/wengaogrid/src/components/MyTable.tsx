import {
    GroupingState,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    getCoreRowModel,
    getGroupedRowModel,
    getExpandedRowModel,
    ColumnDef,
    flexRender,
    HeaderGroup,
    Header
} from "@tanstack/react-table";
import { createElement, useMemo, useState, CSSProperties } from "react";
import { Person, makeData } from "./makeData";
import classNames from "classnames";

export interface MyTableProps {
    className?: string;
    style?: CSSProperties;
}
export function getMergeHeaderGroups(headerGroups: Array<HeaderGroup<Person>>): Array<HeaderGroup<Person>> {
    if (headerGroups.length === 1) {
        return headerGroups;
    }
    const columnsIds = new Set();

    return headerGroups.map((group, depth, { length: fullDepth }) => ({
        ...group,
        headers: group.headers
            .filter(header => !columnsIds.has(header.column.id)) // Ignore already merged columns
            .map((header): Header<Person, unknown> => {
                columnsIds.add(header.column.id);
                return header.isPlaceholder
                    ? {
                          ...header,
                          // If the cell is placeholder(empty), then there will be no subgroup below it,
                          // and this means that you can merge it with all lower cells in the column header
                          isPlaceholder: false,
                          rowSpan: fullDepth - depth
                      }
                    : { ...header, rowSpan: 1 };
            })
    }));
}
export function MyTable(_props: MyTableProps) {
    const columns = useMemo<Array<ColumnDef<Person>>>(
        () => [
            {
                header: "Name",
                columns: [
                    {
                        accessorKey: "firstName",
                        header: "First Name",
                        cell: info => info.getValue(),
                        /**
                         * override the value used for row grouping
                         * (otherwise, defaults to the value derived from accessorKey / accessorFn)
                         */
                        getGroupingValue: row => `${row.firstName} ${row.lastName}`
                    },
                    {
                        accessorFn: row => row.lastName,
                        id: "lastName",
                        header: () => <span>Last Name</span>,
                        cell: info => info.getValue()
                    }
                ]
            },
            {
                header: "Info",
                columns: [
                    {
                        accessorKey: "age",
                        header: () => "Age",
                        aggregatedCell: ({ getValue }) => Math.round(getValue<number>() * 100) / 100,
                        aggregationFn: "median"
                    },
                    {
                        header: "More Info",
                        columns: [
                            {
                                accessorKey: "visits",
                                header: () => <span>Visits</span>,
                                aggregationFn: "sum"
                                // aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
                            },
                            {
                                accessorKey: "status",
                                header: "Status"
                            },
                            {
                                accessorKey: "progress",
                                header: "Profile Progress",
                                cell: ({ getValue }) => Math.round(getValue<number>() * 100) / 100 + "%",
                                aggregationFn: "mean",
                                aggregatedCell: ({ getValue }) => Math.round(getValue<number>() * 100) / 100 + "%"
                            }
                        ]
                    }
                ]
            }
        ],
        []
    );
    const [data, setData] = useState(() => makeData(100000));
    const refreshData = () => setData(() => makeData(100000));

    const [grouping, setGrouping] = useState<GroupingState>([]);
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        state: {
            grouping,
            rowSelection
        },
        onGroupingChange: setGrouping,
        enableMultiRowSelection: false,
        onRowSelectionChange: setRowSelection,
        getExpandedRowModel: getExpandedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        debugTable: true
    });
    return (
        <div className="mx-grid mx-datagrid datagrid-sm datagrid-hover datagrid-bordered">
            <div className="h-2" />
            <table>
                <thead>
                    {getMergeHeaderGroups(table.getHeaderGroups()).map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan} rowSpan={header.rowSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {header.column.getCanGroup() ? (
                                                    // If the header can be grouped, let's add a toggle
                                                    <button
                                                        {...{
                                                            onClick: header.column.getToggleGroupingHandler(),
                                                            style: {
                                                                cursor: "pointer"
                                                            }
                                                        }}
                                                    >
                                                        {header.column.getIsGrouped()
                                                            ? `🛑(${header.column.getGroupedIndex()}) `
                                                            : `👊 `}
                                                    </button>
                                                ) : null}{" "}
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </div>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <tr
                                key={row.id}
                                className={classNames({ selected: row.getIsSelected() })}
                                onClick={e => row.getToggleSelectedHandler()(e)}
                            >
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td
                                            key={cell.id}
                                            style={{
                                                background: cell.getIsGrouped()
                                                    ? "#0aff0082"
                                                    : cell.getIsAggregated()
                                                    ? "#ffa50078"
                                                    : cell.getIsPlaceholder()
                                                    ? "#ff000042"
                                                    : "white"
                                            }}
                                        >
                                            {cell.getIsGrouped() ? (
                                                // If it's a grouped cell, add an expander and row count
                                                <div>
                                                    <button
                                                        {...{
                                                            onClick: row.getToggleExpandedHandler(),
                                                            style: {
                                                                cursor: row.getCanExpand() ? "pointer" : "normal"
                                                            }
                                                        }}
                                                    >
                                                        {row.getIsExpanded() ? "👇" : "👉"}{" "}
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}{" "}
                                                        {row.subRows.length})
                                                    </button>
                                                </div>
                                            ) : cell.getIsAggregated() ? (
                                                // If the cell is aggregated, use the Aggregated
                                                // renderer for cell
                                                flexRender(
                                                    cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                                                // Otherwise, just render the regular cell
                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="mx-grid-controlbar">
                <div className="mx-grid-pagingbar" role="navigation" aria-label="Pagination">
                    <button
                        type="button"
                        className="btn mx-button mx-name-paging-first"
                        aria-label="Go to first page"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="glyphicon glyphicon-step-backward"></span>{" "}
                    </button>
                    <button
                        type="button"
                        className="btn mx-button mx-name-paging-previous"
                        aria-label="Go to previous page"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="glyphicon glyphicon-backward"></span>{" "}
                    </button>
                    <div className="dijitInline mx-grid-paging-status" aria-hidden="true">
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </div>{" "}
                    <span className="sr-only">Currently showing 1 to 1 of 1</span>
                    <button
                        type="button"
                        className="btn mx-button mx-name-paging-next"
                        aria-label="Go to next page"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="glyphicon glyphicon-forward"></span>{" "}
                    </button>
                    <button
                        type="button"
                        className="btn mx-button mx-name-paging-last"
                        aria-label="Go to last page"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="glyphicon glyphicon-step-forward"></span>{" "}
                    </button>
                </div>
            </div>
            <div>{table.getRowModel().rows.length} Rows</div>
            <div>
                <button className="btn" onClick={() => refreshData()}>
                    Refresh Data
                </button>
            </div>
            <pre>{JSON.stringify(grouping, null, 2)}</pre>
            <pre>{JSON.stringify(rowSelection, null, 2)}</pre>
        </div>
    );
}
