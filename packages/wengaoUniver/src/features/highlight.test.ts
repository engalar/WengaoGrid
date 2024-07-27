import { SelectionRange } from "../univer";
import { describe, it, expect } from "vitest";
import { EntityLayout, EntityRange, getEntityRanges, getHighlights } from "./highlight";

describe("App", () => {
    it("getHighlights", () => {
        const layout: EntityLayout = {
            rowStart: 3,
            rowGap: 2,
            columnLocations: [0, 2, 3, 5],
            size: 3
        };
        const selection: SelectionRange = { x: 0, y: 3, width: 100, height: 2 * 3 };

        const entityRanges: EntityRange[] = getEntityRanges(layout);
        expect(entityRanges).to.deep.equal(
            [
                { x: 0, y: 3 + 2 * 0, width: 5, height: 1, entityIndex: 0 },
                { x: 0, y: 3 + 2 * 1, width: 5, height: 1, entityIndex: 1 },
                { x: 0, y: 3 + 2 * 2, width: 5, height: 1, entityIndex: 2 }
            ],
            "should get 3 entity"
        );

        const highlights = getHighlights(layout, selection);
        expect(highlights).to.deep.equal([
            { range: { x: 0, y: 3 + 2 * 0, width: 5, height: 1 }, color: "red", entityIndex: 0 },
            { range: { x: 0, y: 3 + 2 * 1, width: 5, height: 1 }, color: "red", entityIndex: 1 },
            { range: { x: 0, y: 3 + 2 * 2, width: 5, height: 1 }, color: "red", entityIndex: 2 }
        ]);
    });
});
