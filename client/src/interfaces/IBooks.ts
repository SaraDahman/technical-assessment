import { IBook } from "./IBook";

export interface IBooks {
    disabled: boolean;
    books: IBook[];
    error: number;
    tab: null | number;
    loading: boolean;
    search: string;
    active: number;
    categories: string[];
    timeoutId: number | null;
    contentLoading: boolean;
    category: string;
    page: number;
    count: number;
}