import { IBook } from "./IBook";

export interface IArchive {
    books: IBook[];
    error: number;
    loading: boolean;
    contentLoading: boolean;
    category: string;
    count: number;
    page: number;
    timeoutId: number | null;
    search: string;
}