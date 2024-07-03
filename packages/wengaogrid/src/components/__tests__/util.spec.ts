import { ColumnDef } from "@tanstack/react-table";
import { getRangeToNearestSelectedId, transformColumn } from "../util";
import { describe, it, expect, test } from "vitest";

describe("getRangeToNearestSelectedId", () => {
    it("No selected IDs, only currentId", () => {
        expect(getRangeToNearestSelectedId([], 5)).toEqual([5]);
    });

    it("Nearest selected ID is greater than currentId", () => {
        expect(getRangeToNearestSelectedId([3, 6, 8], 5)).toEqual([5, 6]);
    });

    it("Nearest selected ID is less than currentId", () => {
        expect(getRangeToNearestSelectedId([1, 3, 4], 5)).toEqual([4, 5]);
    });

    it("CurrentId is one of the selected IDs", () => {
        expect(getRangeToNearestSelectedId([2, 5, 7], 5)).toEqual([5]);
    });

    it("CurrentId less than all selected IDs", () => {
        expect(getRangeToNearestSelectedId([10, 20, 30], 5)).toEqual([5, 6, 7, 8, 9, 10]);
    });

    it("CurrentId greater than all selected IDs", () => {
        expect(getRangeToNearestSelectedId([1, 2, 3], 5)).toEqual([3, 4, 5]);
    });
});

describe("transformColumns", () => {
    test.each([
        [
            [
                {
                    path: "a/\/b",
                    value: "a/b/1"
                },
                {
                    path: "a/\\c",
                    value: "a/c/2"
                }
            ],
            [
                {
                    header: "a",
                    columns: [
                        {
                            header: "/b",
                            columns: [
                                {
                                    header: "1"
                                }
                            ]
                        },
                        {
                            header: "\c",
                            columns: [
                                {
                                    header: "2"
                                }
                            ]
                        }
                    ]
                }
            ]
        ],
        [
            [
                {
                    path: "a/b",
                    value: "a/b/1"
                },
                {
                    path: "a/c",
                    value: "a/c/2"
                }
            ],
            [
                {
                    header: "a",
                    columns: [
                        {
                            header: "b",
                            columns: [
                                {
                                    header: "1"
                                }
                            ]
                        },
                        {
                            header: "c",
                            columns: [
                                {
                                    header: "2"
                                }
                            ]
                        }
                    ]
                }
            ]
        ]
    ])("transformColumns", (columns, expectValue) => {
        const transformedColumns = transformColumn(columns);
        expect(transformedColumns).toEqual(expectValue);
    });
});
