import { createIdentifier } from "@wendellhu/redi";
import { Subject } from "rxjs";

export interface SelectionRange {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ISelection {
    range$: Subject<SelectionRange>;
    clear$: Subject<void>;
}

export const ISelection = createIdentifier<ISelection>("some.name.unique.ISelection");


export class Selection implements ISelection {
    range$ = new Subject<SelectionRange>();
    clear$ = new Subject<void>();
}
