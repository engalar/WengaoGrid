import { describe, it, expect } from "vitest";
export interface SelectionRange {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Highlight {
    range?: SelectionRange;
    ranges?: SelectionRange[];
    color: string;
    entityIndex: number;
}

export interface EntityLayout {
    rowStart: number;
    rowGap: number;
    columnLocations: number[];
    size: number;
}

type EntityRange = SelectionRange & { entityIndex: number };

function getEntityRanges(layout: EntityLayout): EntityRange[] {
    const { rowStart, rowGap, columnLocations, size } = layout;
    const entityRanges: EntityRange[] = [];
    const minX = Math.min(...columnLocations);
    const width = Math.max(...columnLocations) - minX;
    for (let i = 0; i < size - 1; i++) {
        const x = minX;
        const y = rowStart + i * rowGap;
        entityRanges.push({ x, y, width, height: 1, entityIndex: i });
    }

    return entityRanges;
}

function getHighlights(layout: EntityLayout, selection: SelectionRange): Highlight[] {
    const entityRanges: EntityRange[] = getEntityRanges(layout);
    const overlapRanges: EntityRange[] = entityRanges.filter(
        entityRange => getOverlapType(selection, entityRange) !== OverlapType.NONE
    );
    const highlights: Highlight[] = [];
    for (const overlapRange of overlapRanges) {
        const { x, y, width, height, entityIndex } = overlapRange;
        const range: SelectionRange = { x, y, width, height };
        const color = "red";
        highlights.push({ range, color, entityIndex });
    }
    return highlights;
}

function getOverlapType(a: SelectionRange, b: SelectionRange): OverlapType {
    const { x: ax, y: ay, width: aw, height: ah } = a;
    const { x: bx, y: by, width: bw, height: bh } = b;
    const xOverlap = Math.max(0, Math.min(ax + aw, bx + bw) - Math.max(ax, bx));
    const yOverlap = Math.max(0, Math.min(ay + ah, by + bh) - Math.max(ay, by));
    const overlapArea = xOverlap * yOverlap;
    const aArea = aw * ah;
    const bArea = bw * bh;
    if (overlapArea === 0) {
        return OverlapType.NONE;
    } else if (overlapArea === aArea || overlapArea === bArea) {
        return OverlapType.FULL;
    } else {
        return OverlapType.PARTIAL;
    }
}

enum OverlapType {
    NONE,
    PARTIAL,
    FULL
}

describe("App", () => {
    it("should work", () => {
        const layout: EntityLayout = {
            rowStart: 0,
            rowGap: 10,
            columnLocations: [0, 100, 200],
            size: 3
        };
        const selection: SelectionRange = { x: 50, y: 0, width: 100, height: 10 };
        const highlights = getHighlights(layout, selection);
        expect(highlights).to.deep.equal([
            { range: { x: 50, y: 0, width: 100, height: 10 }, color: "red", entityIndex: 0 },
            { range: { x: 50, y: 10, width: 100, height: 10 }, color: "red", entityIndex: 1 },
            { range: { x: 50, y: 20, width: 100, height: 10 }, color: "red", entityIndex: 2 }
        ]);
    });

    it("should work2", () => {
        const layout: EntityLayout = {
            rowStart: 0,
            rowGap: 10,
            columnLocations: [0, 100, 200],
            size: 3
        };
        const selection: SelectionRange = { x: 0, y: 0, width: 100, height: 10 };
        const highlights = getHighlights(layout, selection);
        expect(highlights).to.deep.equal([
            { range: { x: 0, y: 0, width: 100, height: 10 }, color: "red", entityIndex: 0 },
            { range: { x: 0, y: 10, width: 100, height: 10 }, color: "red", entityIndex: 1 },
            { range: { x: 0, y: 20, width: 100, height: 10 }, color: "red", entityIndex: 2 }
        ]);
    });
});
