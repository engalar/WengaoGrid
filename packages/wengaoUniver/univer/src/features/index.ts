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

export class Selection implements ISelection {
    range$ = new Subject<SelectionRange>();
    clear$ = new Subject<void>();
}
