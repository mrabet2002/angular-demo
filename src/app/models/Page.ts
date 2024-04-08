export interface Page<T> {
    data: T[];
    first: number;
    prev: number;
    next: number;
    last: number;
    pages: number;
    items: number;
}