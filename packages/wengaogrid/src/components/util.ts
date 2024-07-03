import { ColumnDef } from "@tanstack/react-table";

export function getRangeToNearestSelectedId(selectedIds: number[], currentId: number): number[] {
    if (selectedIds.length === 0) {
        return [currentId]; // No selected IDs, return currentId itself
    }

    // Find the nearest selected ID
    let nearestId = selectedIds.reduce((prev, curr) =>
        Math.abs(curr - currentId) < Math.abs(prev - currentId) ? curr : prev
    );

    // Generate the range from currentId to nearestId
    let range = [];
    if (currentId <= nearestId) {
        for (let i = currentId; i <= nearestId; i++) {
            range.push(i);
        }
    } else {
        for (let i = nearestId; i <= currentId; i++) {
            range.push(i);
        }
    }

    return range;
}

export function transformColumn(columns: { path: string; value: any }[]): ColumnDef<any>[] {
    const root: { [key: string]: any } = {};

    columns.forEach(({ path, value }) => {
        const pathParts = splitPath(path);
        const valueParts = value.split("/");
        let current = root;

        pathParts.forEach((part, index) => {
            if (!current[part]) {
                current[part] = {};
            }
            current = current[part];

            if (index === pathParts.length - 1) {
                const finalPart = valueParts[valueParts.length - 1];
                current[finalPart] = {};
            }
        });
    });

    function convertToColumnDef(obj: any, header: string): ColumnDef<any> {
        const keys = Object.keys(obj);
        const columnDef: ColumnDef<any> = { header };

        if (keys.length > 0) {
            return { header, columns: keys.map(key => convertToColumnDef(obj[key], key)) };
        }

        return columnDef;
    }

    const rootKeys = Object.keys(root);
    return rootKeys.map(key => convertToColumnDef(root[key], key));
}
function splitPath(path: string): string[] {
    const result: string[] = [];
    let current = '';
    let escaping = false;

    for (let i = 0; i < path.length; i++) {
        const char = path[i];
        if (escaping) {
            current += char;
            escaping = false;
        } else if (char === '\\') {
            escaping = true;
        } else if (char === '/') {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }

    if (current.length > 0) {
        result.push(current);
    }

    return result;
}
